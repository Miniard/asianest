import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl.startsWith("https://") &&
  supabaseUrl.includes(".supabase.co")
);

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (!isSupabaseConfigured) {
    // Return a mock-like client that won't crash during build
    return null as unknown as ReturnType<typeof createBrowserClient>;
  }
  if (!client) {
    client = createBrowserClient(supabaseUrl!, supabaseKey!);
  }
  return client;
}
