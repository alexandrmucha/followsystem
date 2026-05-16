import { decrypt } from "./crypto.ts";
import { adminClient } from "../_shared/adminClient.ts";
import { logError } from "../_shared/logError.ts";

/**
 * 1. CENTRALIZOVANÁ DB FUNKCE
 */
export async function getGmailConnection(userId: string) {
  const { data, error } = await adminClient
    .from("gmail_connections")
    .select("*")
    .eq("user_id", userId)
    .single();


  if (error) {
    logError("gmail_connection_query_failed", error, {
      userId,
    });

    throw new Error("Database error while fetching Gmail connection");
  }

  // 2. Business stav (uživatel nemá propojený Gmail)
  if (!data) {
    throw new Error("No Gmail connection found");
  }

  return data;
}

/**
 * 2. REFRESH GOOGLE TOKEN
 */
export async function refreshGoogleToken(
  userId: string,
  refreshToken: string
) {
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

  const data = await res.json().catch(() => null);

  // 🔴 REVOKE / INVALID GRANT
  if (!res.ok) {
    const error = data?.error;

    const isRevoked = error === "invalid_grant"

    if (isRevoked) {
      logError("google_refresh_token_revoked", data, {
        userId,
      });

      // 💥 HERE: update DB status immediately
      await adminClient
        .from("gmail_connections")
        .update({
          status: "revoked",
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      throw new Error("GOOGLE_REFRESH_REVOKED");
    }

    logError("google_refresh_token_failed", data, {
      status: res.status,
      userId,
    });

    throw new Error("Google token refresh failed");
  }

  // sanity check
  if (!data?.access_token || !data?.expires_in) {
    logError("google_refresh_token_invalid_response", data, {
      userId,
    });

    throw new Error("Invalid Google token response");
  }

  return {
    access_token: data.access_token,
    expires_in: data.expires_in,
  };
}

/**
 * 3. HLAVNÍ LOGIKA: VALID ACCESS TOKEN
 */
export async function getValidAccessToken(userId: string) {
  const connection = await getGmailConnection(userId);

  const expiresAt = new Date(connection.expires_at);
  const bufferMs = 60 * 1000;

  // 1. stále validní token
  if (
    expiresAt.getTime() - bufferMs > Date.now() &&
    connection.access_token
  ) {
    return connection.access_token;
  }

  // 2. musí se refreshnout
  if (!connection.refresh_token_enc || !connection.refresh_token_iv) {
    throw new Error("Missing refresh token");
  }

  const refreshToken = await decrypt(
    connection.refresh_token_enc,
    connection.refresh_token_iv
  );

  const refreshed = await refreshGoogleToken(userId, refreshToken);

  const newExpiresAt = new Date(Date.now() + refreshed.expires_in * 1000);

  // 3. uložit nový access token
  const { error: updateError } = await adminClient
    .from("gmail_connections")
    .update({
      access_token: refreshed.access_token,
      expires_at: newExpiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (updateError) {
    throw new Error("Failed to update refreshed token");
  }

  return refreshed.access_token;
}