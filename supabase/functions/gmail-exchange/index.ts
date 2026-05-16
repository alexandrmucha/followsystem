import { corsHeaders } from 'npm:@supabase/supabase-js/cors'
import { encrypt } from "../_shared/crypto.ts";
import { adminClient } from "../_shared/adminClient.ts";
import { createUserClient } from "../_shared/userClient.ts";
import { logError } from "../_shared/logError.ts";

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const userClient = createUserClient(req);

  // --- AUTH USER ---
  const { data: userData, error: userError } = await userClient.auth.getUser()

  if (userError || !userData?.user) {
    logError('auth_failed', userError, {
      has_user: !!userData?.user,
    })

    return new Response(JSON.stringify({
      error: 'Unauthorized'
    }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const userId = userData.user.id

  // --- GET CODE ---
  const body = await req.json().catch(() => null)
  const code = body?.code

  if (!code) {
    logError('missing_oauth_code', null, {
      user_id: userId,
    })

    return new Response(JSON.stringify({
      error: 'Missing OAuth code'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // --- EXCHANGE CODE FOR TOKENS ---
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: Deno.env.get('GOOGLE_CLIENT_ID')!,
      client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET')!,
      redirect_uri: Deno.env.get('GOOGLE_REDIRECT_URI')!,
      grant_type: 'authorization_code',
    }),
  })

  const tokens = await tokenRes.json().catch(() => null)

  if (!tokenRes.ok || !tokens) {
    logError('google_token_exchange_failed', tokens, {
      user_id: userId,
    })

    return new Response(JSON.stringify({
      error: 'OAuth exchange failed'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // --- SANITY CHECK TOKENS (OAUTH CONTRACT) ---
  if (!tokens.access_token || !tokens.expires_in || !tokens.scope) {
    logError('invalid_google_token_response', tokens, {
      user_id: userId,
      has_access_token: !!tokens.access_token,
      has_expires_in: !!tokens.expires_in,
      has_scope: !!tokens.scope,
    })

    return new Response(JSON.stringify({
      error: 'Invalid OAuth token response'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // --- GET GOOGLE USER INFO ---
  const googleUserRes = await fetch(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    }
  )

  const googleUser = await googleUserRes.json().catch(() => null)

  if (!googleUserRes.ok || !googleUser) {
    logError('google_userinfo_failed', googleUser, {
      user_id: userId,
    })

    return new Response(JSON.stringify({
      error: 'Failed to fetch Google user info'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // --- SANITY CHECK GOOGLE USER ---
  if (!googleUser.id || !googleUser.email) {
    logError('invalid_google_userinfo', googleUser, {
      user_id: userId,
    })

    return new Response(JSON.stringify({
      error: 'Invalid Google user info'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // --- CHECK EXISTING CONNECTION ---
  const { data: existing, error: existingError } = await adminClient
    .from('gmail_connections')
    .select('google_id')
    .eq('user_id', userId)
    .maybeSingle()

  if (existingError) {
    logError('db_existing_connection_fetch_failed', existingError, {
      user_id: userId,
    })

    return new Response(JSON.stringify({
      error: 'Database error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // 🔥 BLOCK different Google account on reconnect
  if (existing?.google_id && existing.google_id !== googleUser.id) {
    logError('different_google_account_attempt', null, {
      user_id: userId,
      existing_google_id: existing.google_id,
      new_google_id: googleUser.id,
    })

    return new Response(JSON.stringify({
      error: 'DIFFERENT_GOOGLE_ACCOUNT'
    }), {
      status: 409,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // --- ENCRYPT REFRESH TOKEN (BUSINESS CONTRACT) ---
  if (!tokens.refresh_token) {
    logError('missing_refresh_token_from_google', tokens, {
      user_id: userId,
      has_access_token: !!tokens.access_token,
      scope: tokens.scope,
    })

    return new Response(JSON.stringify({
      error: 'Missing refresh token'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const enc = await encrypt(tokens.refresh_token)

  const refresh_token_enc = enc.data
  const refresh_token_iv = enc.iv

  // --- UPSERT CONNECTION ---
  const { error: insertError } = await adminClient
    .from('gmail_connections')
    .upsert(
      {
        user_id: userId,

        google_id: googleUser.id,
        email: googleUser.email,

        access_token: tokens.access_token,
        expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),

        refresh_token_enc,
        refresh_token_iv,

        scopes: tokens.scope?.trim().split(' ').filter(Boolean) ?? [],

        status: 'active',

        connected_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id',
      }
    )

  // --- ERROR HANDLING ---
  if (insertError) {
    if (insertError.code === '23505') {
      logError('gmail_already_connected', insertError, {
        user_id: userId,
        google_id: googleUser.id,
      })

      return new Response(JSON.stringify({
        error: 'GMAIL_ALREADY_CONNECTED'
      }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    logError('db_upsert_failed', insertError, {
      user_id: userId,
    })

    return new Response(JSON.stringify({
      error: 'Database error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // --- SUCCESS ---
  return new Response(JSON.stringify({
    ok: true
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})