<template>
  <div class="max-w-3xl mx-auto px-6 py-16">

    <template v-if="locale === 'cs'">
      <h1 class="text-3xl font-bold mb-2">Podmínky použití</h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-12">Poslední aktualizace: červen 2026</p>

      <div class="space-y-10 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">1. Popis služby</h2>
          <p>Fulply je SaaS nástroj určený web designérům a agenturám. Umožňuje vyhledávat firmy z Google Maps, analyzovat jejich webové stránky a generovat personalizované e-maily pro oslovení potenciálních klientů.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">2. Účet</h2>
          <p>Pro používání služby je nutná registrace e-mailovou adresou nebo účtem Google. Jste zodpovědní za veškerou aktivitu prováděnou pod vaším účtem. Přístup ke svému účtu nikomu nesdílejte.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">3. Přijatelné použití</h2>
          <p>Zavazujete se používat Fulply v souladu s platnými právními předpisy, zejména se zákonem o ochraně osobních údajů (GDPR) a předpisy o nevyžádané komunikaci (CAN-SPAM, ePrivacy). Nesmíte prostřednictvím služby rozesílat nevyžádanou hromadnou poštu ani službu využívat k protiprávním účelům.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">4. Předplatné a platby</h2>
          <p>Placené plány jsou k dispozici v měsíčním nebo ročním cyklu. Roční předplatné je nevratné po uplynutí 14 dní od zakoupení. Předplatné lze kdykoliv zrušit — přístup ke službě trvá do konce aktuálního zaplaceného období.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">5. Bezplatné vyzkoušení</h2>
          <p>Nové účty obdrží bezplatnou kvótu leadů a generování e-mailů bez nutnosti zadávat platební kartu. Fulply si vyhrazuje právo podmínky bezplatného vyzkoušení kdykoliv změnit.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">6. Omezení odpovědnosti</h2>
          <p>Služba Fulply je poskytována „tak, jak je". Nezaručujeme, že její používání povede k získání nových klientů nebo k jiným obchodním výsledkům. Neneseme odpovědnost za nepřímé, náhodné ani následné škody vzniklé v souvislosti s používáním služby.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">7. Změny podmínek</h2>
          <p>Tyto podmínky můžeme kdykoliv aktualizovat. O podstatných změnách vás budeme informovat e-mailem nebo prostřednictvím upozornění ve službě. Pokračováním v používání služby po zveřejnění změn vyjadřujete souhlas s aktualizovanými podmínkami.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">8. Kontakt</h2>
          <p>V případě dotazů nás kontaktujte na <a href="mailto:support@fulply.com" class="underline hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">support@fulply.com</a>.</p>
        </section>
      </div>
    </template>

    <template v-else>
      <h1 class="text-3xl font-bold mb-2">Terms of Service</h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-12">Last updated: June 2026</p>

      <div class="space-y-10 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">1. Service Description</h2>
          <p>Fulply is a SaaS tool for web designers and agencies. It lets you find businesses from Google Maps, analyse their websites, and generate personalised outreach emails.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">2. Account</h2>
          <p>You need to register with an email address or Google account to use the service. You are responsible for all activity under your account. Do not share access with others.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">3. Acceptable Use</h2>
          <p>You agree to use Fulply in compliance with applicable law, including data protection regulations (GDPR) and anti-spam legislation (CAN-SPAM, ePrivacy). You must not send unsolicited bulk emails or use the service for any unlawful purpose.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">4. Subscriptions and Payments</h2>
          <p>Paid plans are billed monthly or annually. Annual plans are non-refundable after 14 days from purchase. You may cancel at any time — access continues until the end of the current billing period.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">5. Free Trial</h2>
          <p>New accounts receive a free allocation of leads and email generations with no credit card required. Fulply reserves the right to change the terms of the free trial at any time.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">6. Disclaimers</h2>
          <p>The Fulply service is provided "as is." We make no guarantees that using the service will result in new clients or any particular business outcome. We are not liable for indirect, incidental, or consequential damages arising from your use of the service.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">7. Changes to These Terms</h2>
          <p>We may update these Terms at any time. We will notify you of material changes by email or via an in-app notice. Continued use of the service after changes are posted constitutes acceptance of the updated Terms.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">8. Contact</h2>
          <p>If you have any questions, contact us at <a href="mailto:support@fulply.com" class="underline hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">support@fulply.com</a>.</p>
        </section>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const { locale } = useI18n()

useHead({ title: locale.value === 'cs' ? 'Podmínky použití — Fulply' : 'Terms of Service — Fulply' })
</script>
