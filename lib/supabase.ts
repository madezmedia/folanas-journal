import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;
let missingEnvWarned = false;

function getSupabaseCredentials(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url, key };
}

function getSupabase(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const creds = getSupabaseCredentials();
  if (!creds) {
    if (!missingEnvWarned) {
      console.warn('Supabase URL or Key missing. Database operations will fail.');
      missingEnvWarned = true;
    }
    throw new Error(
      'supabaseUrl is required. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY).'
    );
  }

  cachedClient = createClient(creds.url, creds.key);
  return cachedClient;
}

/**
 * Lazy client: `createClient` must not run at import time.
 * Preview/`next build` page-data collection imports this module without
 * Supabase secrets; an empty-string URL throws and fails the build.
 * Runtime still requires env on first use.
 */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    // Avoid thenable detection if this export is accidentally awaited.
    if (prop === 'then') return undefined;
    const client = getSupabase();
    const value = Reflect.get(client, prop, client);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
