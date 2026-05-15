import { decrypt } from "./crypto.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

export async function refreshGoogleToken(refreshToken: string) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: Deno.env.get("GOOGLE_CLIENT_ID")!,
      client_secret: Deno.env.get("GOOGLE_CLIENT_SECRET")!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Refresh failed: ${JSON.stringify(data)}`);
  }

  return {
    access_token: data.access_token,
    expires_in: data.expires_in,
  };
}

export async function getValidAccessToken(userId: string) {
  const SUPABASE_SECRET_KEYS = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS')!)
  const SUPABASE_PUBLISHABLE_KEYS = JSON.parse(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS')!)

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    SUPABASE_SECRET_KEYS['default']
  )

  const { data, error } = await supabase
    .from("gmail_connections")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    throw new Error("No Gmail connection found");
  }

  const expiresAt = new Date(data.expires_at);
  const now = new Date();

  // 1. stále validní token
  const bufferMs = 60 * 1000;

  if (
    expiresAt.getTime() - bufferMs > Date.now() &&
    data.access_token
  ) {
    return data.access_token;
  }

  // 2. musí se refreshnout
  if (!data.refresh_token_enc || !data.refresh_token_iv) {
    throw new Error("Missing refresh token");
  }

  const refreshToken = await decrypt(
    data.refresh_token_enc,
    data.refresh_token_iv
  );

  const refreshed = await refreshGoogleToken(refreshToken);

  const newExpiresAt = new Date(Date.now() + refreshed.expires_in * 1000);

  // 3. uložit nový access token
  const { error: updateError } = await supabase
    .from("gmail_connections")
    .update({
      access_token: refreshed.access_token,
      expires_at: newExpiresAt.toISOString(),
    })
    .eq("user_id", userId);

  if (updateError) {
    throw new Error("Failed to update refreshed token");
  }

  return refreshed.access_token;
}