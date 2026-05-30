import { createBrowserClient } from "@supabase/ssr";

function getEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  };
}

export function isSupabaseConfigured() {
  const { url, key } = getEnv();
  return url.startsWith("https://") && key.length > 20;
}

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  const { url, key } = getEnv();
  if (!url.startsWith("https://") || key.length < 20) {
    return null as unknown as ReturnType<typeof createBrowserClient>;
  }
  if (!client) {
    client = createBrowserClient(url, key);
  }
  return client;
}
