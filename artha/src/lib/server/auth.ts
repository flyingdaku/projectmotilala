import { createClient } from "@/lib/supabase/server";

export async function getAuthenticatedUserId(): Promise<string | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}
