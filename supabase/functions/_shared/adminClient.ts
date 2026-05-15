import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_SECRET_KEYS = JSON.parse(
  Deno.env.get("SUPABASE_SECRET_KEYS")!
);

export const adminClient = createClient(
  Deno.env.get("SUPABASE_URL")!,
  SUPABASE_SECRET_KEYS["default"]
);