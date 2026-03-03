import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import { useAuth } from "~/features/auth/model/use-auth";
import { parseCASPDF } from "../lib/cas-parser";

/**
 * CAS Import hook.
 * Orchestrates: PDF pick → client-side parse → Supabase upsert.
 *
 * Security: PDF is parsed entirely client-side. Raw PDF bytes never leave the device.
 * Only structured transaction data is sent to Supabase.
 */
export function useCASImport() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (pdfBase64: string) => {
      if (!user) throw new Error("Not authenticated");

      setProgress("Parsing CAS PDF...");
      const parsed = await parseCASPDF(pdfBase64);

      setProgress(`Found ${parsed.folios.length} folios. Saving...`);

      // Get or create default portfolio
      const { data: portfolio, error: portError } = await supabase
        .from("portfolios")
        .select("id")
        .eq("user_id", user.id)
        .eq("is_default", true)
        .single();

      if (portError) {
        // Create default portfolio
        const { data: newPort, error: createError } = await supabase
          .from("portfolios")
          .insert({
            user_id: user.id,
            name: "My Portfolio",
            is_default: true,
          })
          .select("id")
          .single();
        if (createError) throw createError;
        return upsertFolios(newPort!.id, parsed, setProgress);
      }

      return upsertFolios(portfolio!.id, parsed, setProgress);
    },
    onSuccess: () => {
      setProgress("Import complete!");
      queryClient.invalidateQueries({ queryKey: ["portfolio-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["holdings"] });
    },
    onError: () => {
      setProgress(null);
    },
  });

  return {
    importCAS: mutation.mutate,
    isImporting: mutation.isPending,
    progress,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: () => {
      mutation.reset();
      setProgress(null);
    },
  };
}

async function upsertFolios(
  portfolioId: string,
  parsed: Awaited<ReturnType<typeof parseCASPDF>>,
  setProgress: (msg: string) => void
) {
  let totalTx = 0;

  for (const folio of parsed.folios) {
    setProgress(`Processing ${folio.scheme_name}...`);

    // Upsert holding
    const { data: holding, error: holdingError } = await supabase
      .from("holdings")
      .upsert(
        {
          portfolio_id: portfolioId,
          isin: folio.isin,
          folio_number: folio.folio_number,
          scheme_name: folio.scheme_name,
          amc_name: folio.amc_name,
          asset_class: folio.asset_class,
          units: folio.closing_units,
          avg_nav: folio.avg_nav,
        },
        { onConflict: "portfolio_id,folio_number" }
      )
      .select("id")
      .single();

    if (holdingError) throw holdingError;

    // Upsert transactions (idempotent by date+type+units)
    if (folio.transactions.length > 0) {
      const txRows = folio.transactions.map((tx) => ({
        holding_id: holding!.id,
        portfolio_id: portfolioId,
        date: tx.date,
        type: tx.type,
        source: "CAS_IMPORT" as const,
        units: tx.units,
        nav: tx.nav,
        amount: tx.amount,
        folio_number: folio.folio_number,
      }));

      const { error: txError } = await supabase
        .from("transactions")
        .upsert(txRows, {
          onConflict: "holding_id,date,type,units",
          ignoreDuplicates: true,
        });

      if (txError) throw txError;
      totalTx += txRows.length;
    }
  }

  return { foliosImported: parsed.folios.length, transactionsImported: totalTx };
}
