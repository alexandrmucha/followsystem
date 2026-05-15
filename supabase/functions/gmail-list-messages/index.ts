import { corsHeaders } from 'npm:@supabase/supabase-js/cors'
import { adminClient } from "../_shared/adminClient.ts";
import { createUserClient } from "../_shared/userClient.ts";
import { getValidAccessToken } from "../_shared/googleAuth.ts";
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

  const accessToken = await getValidAccessToken(userData.user.id)

  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=INBOX&maxResults=10",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const listData = await listRes.json();

  const emails = await Promise.all(
    (listData.messages || []).map(async (m: any) => {
      const res = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=full`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return res.json();
    })
  );

  function getHeader(headers: any[], name: string) {
    return headers?.find(h => h.name === name)?.value;
  }

  const parsed = emails.map((email) => ({
      id: email.id,
      subject: getHeader(email.payload.headers, "Subject"),
      from: getHeader(email.payload.headers, "From"),
      date: getHeader(email.payload.headers, "Date"),
    }));

    return new Response(
    JSON.stringify({
      ok: true,
      emails: parsed,
    }),
    {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );



})