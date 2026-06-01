import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      // During static build / SSR prerender — return a dummy that won't crash
      // Real client gets created on first client-side call
      return new Proxy({} as any, {
        get: () => () => new Proxy({} as any, {
          get: () => () => Promise.resolve({ data: null, error: null }),
        }),
      }) as ReturnType<typeof createBrowserClient>;
    }
    client = createBrowserClient(url, key);
  }
  return client;
}
