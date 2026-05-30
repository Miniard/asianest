import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const _configured = SUPABASE_URL.startsWith("https://") && SUPABASE_KEY.length > 20;

export function isSupabaseConfigured() {
  return _configured;
}

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (!_configured) {
    return null as unknown as ReturnType<typeof createBrowserClient>;
  }
  if (!client) {
    client = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
  }
  return client;
}
