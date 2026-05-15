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

  // --- GET CODE FROM URL ---
  const { code } = await req.json()

  if (!code) {
    logError('missing_oauth_code', null, {
      user_id: userData.user.id,
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

  const tokens = await tokenRes.json()

  if (!tokenRes.ok) {
    logError('google_token_exchange_failed', tokens, {
      user_id: userData.user.id,
    })

    return new Response(JSON.stringify({
      error: 'OAuth exchange failed'
    }), {
      status: 400,
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

  const googleUser = await googleUserRes.json()

  if (!googleUserRes.ok) {
    logError('google_userinfo_failed', googleUser, {
      user_id: userData.user.id,
    })

    return new Response(JSON.stringify({
      error: 'Failed to fetch Google user info'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // --- ENCRYPT REFRESH TOKEN ---
  let refresh_token_enc = null
  let refresh_token_iv = null

  if (tokens.refresh_token) {
    const enc = await encrypt(tokens.refresh_token)
    refresh_token_enc = enc.data
    refresh_token_iv = enc.iv
  }

  // --- UPSERT CONNECTION ---
  const { error: insertError } = await adminClient
    .from('gmail_connections')
    .upsert(
      {
        user_id: userData.user.id,

        google_id: googleUser.id,
        email: googleUser.email,

        access_token: tokens.access_token,

        refresh_token_enc: refresh_token_enc,
        refresh_token_iv: refresh_token_iv,

        expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),

        scopes: tokens.scope?.split(' ') ?? [],

        status: 'active',
        connected_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id',
      }
    )

  if (insertError) {
    logError('db_upsert_failed', insertError, {
      user_id: userData.user.id,
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