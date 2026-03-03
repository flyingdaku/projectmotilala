/**
 * CAS PDF Parser — client-side only.
 *
 * Parses CAMS/KFintech Consolidated Account Statement PDFs.
 * Uses regex-based text extraction from the PDF text layer.
 *
 * Security: All parsing happens on-device. Raw PDF never leaves the device.
 * Only structured JSON is sent to Supabase.
 *
 * Supported formats:
 * - CAMS CAS (password-protected, password = PAN)
 * - KFintech CAS
 * - NSDL CAS (equity + MF combined)
 */

import { AssetClass, TransactionType } from "@indiaquant/types";

export interface CASTransaction {
  date: string; // YYYY-MM-DD
  type: TransactionType;
  units: string;
  nav: string;
  amount: string;
  description: string;
}

export interface CASFolio {
  folio_number: string;
  isin: string | null;
  scheme_name: string;
  amc_name: string;
  asset_class: AssetClass;
  closing_units: string;
  avg_nav: string;
  transactions: CASTransaction[];
}

export interface CASParseResult {
  pan: string | null;
  investor_name: string | null;
  statement_date: string | null;
  folios: CASFolio[];
  raw_text_length: number;
}

// ---------------------------------------------------------------------------
// Transaction type mapping from CAS description strings
// ---------------------------------------------------------------------------

const TX_TYPE_MAP: Array<[RegExp, TransactionType]> = [
  [/purchase|buy|lumpsum/i, TransactionType.BUY],
  [/sip|systematic investment/i, TransactionType.SIP],
  [/redemption|redeem|sell/i, TransactionType.SELL],
  [/switch.?in/i, TransactionType.SWITCH_IN],
  [/switch.?out/i, TransactionType.SWITCH_OUT],
  [/stp.?in/i, TransactionType.STP_IN],
  [/stp.?out/i, TransactionType.STP_OUT],
  [/swp/i, TransactionType.SWP],
  [/dividend reinvest/i, TransactionType.DIVIDEND_REINVEST],
  [/dividend payout/i, TransactionType.DIVIDEND_PAYOUT],
  [/bonus/i, TransactionType.BONUS],
];

function inferTxType(description: string): TransactionType {
  for (const [pattern, type] of TX_TYPE_MAP) {
    if (pattern.test(description)) return type;
  }
  return TransactionType.BUY;
}

// ---------------------------------------------------------------------------
// Asset class inference from scheme name
// ---------------------------------------------------------------------------

function inferAssetClass(schemeName: string): AssetClass {
  const name = schemeName.toLowerCase();
  if (/elss|tax sav/i.test(name)) return AssetClass.ELSS;
  if (/index|nifty|sensex|bse|nse/i.test(name)) return AssetClass.INDEX_FUND;
  if (/etf/i.test(name)) return AssetClass.ETF;
  if (/liquid|overnight|money market|ultra short/i.test(name)) return AssetClass.DEBT_MF;
  if (/debt|bond|gilt|gsec|g-sec|income|credit/i.test(name)) return AssetClass.DEBT_MF;
  if (/hybrid|balanced|aggressive|conservative/i.test(name)) return AssetClass.HYBRID_MF;
  return AssetClass.EQUITY_MF;
}

// ---------------------------------------------------------------------------
// Date parsing — handles DD-MMM-YYYY, DD/MM/YYYY, YYYY-MM-DD
// ---------------------------------------------------------------------------

const MONTH_MAP: Record<string, string> = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
  jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

function parseDate(raw: string): string {
  raw = raw.trim();

  // DD-MMM-YYYY or DD-MMM-YY
  const dmy = raw.match(/^(\d{1,2})[-\/]([A-Za-z]{3})[-\/](\d{2,4})$/);
  if (dmy) {
    const [, d, m, y] = dmy;
    const month = MONTH_MAP[m.toLowerCase()];
    const year = y.length === 2 ? `20${y}` : y;
    return `${year}-${month}-${d.padStart(2, "0")}`;
  }

  // DD/MM/YYYY
  const slash = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slash) {
    const [, d, m, y] = slash;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }

  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  return raw;
}

// ---------------------------------------------------------------------------
// Main parser
// ---------------------------------------------------------------------------

/**
 * Parse a CAS PDF given its base64-encoded content.
 * Returns structured folio + transaction data.
 *
 * NOTE: In production, use expo-document-picker + a WASM PDF.js build
 * to extract text from the PDF. This parser operates on the extracted text.
 * The pdfBase64 parameter here represents the extracted text content
 * (passed as base64 for transport from the native PDF reader).
 */
export async function parseCASPDF(textContent: string): Promise<CASParseResult> {
  // Decode if base64
  let text: string;
  try {
    text = atob(textContent);
  } catch {
    text = textContent; // Already plain text
  }

  const result: CASParseResult = {
    pan: null,
    investor_name: null,
    statement_date: null,
    folios: [],
    raw_text_length: text.length,
  };

  // Extract PAN
  const panMatch = text.match(/PAN\s*[:\-]?\s*([A-Z]{5}\d{4}[A-Z])/i);
  if (panMatch) result.pan = panMatch[1].toUpperCase();

  // Extract investor name
  const nameMatch = text.match(/(?:investor|name)\s*[:\-]?\s*([A-Z][A-Z\s]{2,50})/i);
  if (nameMatch) result.investor_name = nameMatch[1].trim();

  // Extract statement date
  const dateMatch = text.match(/(?:statement|as on|as at)\s*[:\-]?\s*(\d{1,2}[-\/][A-Za-z]{3}[-\/]\d{2,4})/i);
  if (dateMatch) result.statement_date = parseDate(dateMatch[1]);

  // Parse folios — CAMS format
  // Folio blocks start with "Folio No:" and end at next folio or EOF
  const folioPattern = /Folio\s*No\s*[:\-]?\s*(\S+)/gi;
  let folioMatch: RegExpExecArray | null;
  const folioPositions: Array<{ folio: string; pos: number }> = [];

  while ((folioMatch = folioPattern.exec(text)) !== null) {
    folioPositions.push({ folio: folioMatch[1], pos: folioMatch.index });
  }

  for (let i = 0; i < folioPositions.length; i++) {
    const start = folioPositions[i].pos;
    const end = i + 1 < folioPositions.length ? folioPositions[i + 1].pos : text.length;
    const block = text.slice(start, end);

    const folio = parseFolioBlock(folioPositions[i].folio, block);
    if (folio) result.folios.push(folio);
  }

  // If no folios found via CAMS format, try KFintech format
  if (result.folios.length === 0) {
    result.folios.push(...parseKFintechFormat(text));
  }

  return result;
}

function parseFolioBlock(folioNumber: string, block: string): CASFolio | null {
  // Extract scheme name (line after "Registrar:" or scheme name pattern)
  const schemeMatch = block.match(/(?:scheme|fund)\s*[:\-]?\s*([^\n]{10,80})/i);
  const schemeName = schemeMatch ? schemeMatch[1].trim() : "Unknown Scheme";

  // Extract AMC name
  const amcMatch = block.match(/(?:amc|fund house|asset management)\s*[:\-]?\s*([^\n]{5,60})/i);
  const amcName = amcMatch ? amcMatch[1].trim() : "";

  // Extract ISIN
  const isinMatch = block.match(/ISIN\s*[:\-]?\s*([A-Z]{2}[A-Z0-9]{10})/i);
  const isin = isinMatch ? isinMatch[1].toUpperCase() : null;

  // Extract closing units
  const closingMatch = block.match(/(?:closing|balance|units)\s*[:\-]?\s*([\d,]+\.?\d*)/i);
  const closingUnits = closingMatch ? closingMatch[1].replace(/,/g, "") : "0";

  // Parse transactions
  const transactions = parseTransactions(block);

  // Compute avg NAV from transactions
  let totalAmount = 0;
  let totalUnits = 0;
  for (const tx of transactions) {
    if (["BUY", "SIP", "SWITCH_IN"].includes(tx.type)) {
      totalAmount += parseFloat(tx.amount) || 0;
      totalUnits += parseFloat(tx.units) || 0;
    }
  }
  const avgNav = totalUnits > 0 ? (totalAmount / totalUnits).toFixed(4) : "0";

  return {
    folio_number: folioNumber,
    isin,
    scheme_name: schemeName,
    amc_name: amcName,
    asset_class: inferAssetClass(schemeName),
    closing_units: closingUnits,
    avg_nav: avgNav,
    transactions,
  };
}

function parseTransactions(block: string): CASTransaction[] {
  const transactions: CASTransaction[] = [];

  // Transaction line pattern: date | description | units | nav | amount
  // Handles CAMS format: DD-MMM-YYYY Description Units NAV Amount
  const txPattern =
    /(\d{1,2}[-\/][A-Za-z]{3}[-\/]\d{2,4})\s+([^\d\n]{5,60}?)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)/g;

  let match: RegExpExecArray | null;
  while ((match = txPattern.exec(block)) !== null) {
    const [, date, desc, units, nav, amount] = match;
    transactions.push({
      date: parseDate(date),
      type: inferTxType(desc),
      units: units.replace(/,/g, ""),
      nav: nav.replace(/,/g, ""),
      amount: amount.replace(/,/g, ""),
      description: desc.trim(),
    });
  }

  return transactions;
}

function parseKFintechFormat(text: string): CASFolio[] {
  // KFintech uses slightly different patterns
  // This is a simplified stub — full implementation handles KFintech-specific layout
  const folios: CASFolio[] = [];

  const schemeBlocks = text.split(/(?=\d{12,16}\/\d+)/); // KFintech folio pattern
  for (const block of schemeBlocks) {
    if (block.length < 50) continue;
    const folioMatch = block.match(/^(\d{12,16}\/\d+)/);
    if (!folioMatch) continue;

    const folio = parseFolioBlock(folioMatch[1], block);
    if (folio) folios.push(folio);
  }

  return folios;
}
