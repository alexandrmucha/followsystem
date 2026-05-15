import { createClient } from "npm:@supabase/supabase-js@2";

export function createUserClient(req: Request) {
  const SUPABASE_PUBLISHABLE_KEYS = JSON.parse(
    Deno.env.get("SUPABASE_PUBLISHABLE_KEYS")!
  );

  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    SUPABASE_PUBLISHABLE_KEYS["default"],
    {
      global: {
        headers: {
          Authorization: req.headers.get("Authorization")!,
        },
      },
    }
  );
}