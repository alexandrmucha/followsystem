<template>
  <div class="max-w-3xl mx-auto px-6 py-16">

    <template v-if="locale === 'cs'">
      <h1 class="text-3xl font-bold mb-2">Zásady ochrany soukromí</h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-12">Poslední aktualizace: červen 2026</p>

      <div class="space-y-10 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">1. Jaká data sbíráme</h2>
          <ul class="space-y-2 list-disc list-inside marker:text-neutral-400">
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">E-mailová adresa</span> — pro přihlášení a zasílání transakčních e-mailů.</li>
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Vyhledávací dotazy</span> — odvětví a lokace, které zadáváte při hledání firem.</li>
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Výsledky analýz</span> — skóre webů a AI poznámky uložené k vašemu účtu.</li>
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Data o používání</span> — anonymní analytika (zobrazené stránky, použité funkce) pro zlepšování služby.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">2. K čemu data používáme</h2>
          <p>Vaše data používáme výhradně pro poskytování a zlepšování služby Fulply a pro zasílání přihlašovacích e-mailů. Vaše data neprodáváme třetím stranám.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">3. Třetí strany</h2>
          <ul class="space-y-2 list-disc list-inside marker:text-neutral-400">
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Google Maps API</span> — pro načítání veřejných záznamů o firmách.</li>
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Google OAuth</span> — volitelná metoda přihlášení.</li>
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Cloudflare Turnstile</span> — ochrana přihlašovacího formuláře před boty.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">4. Uchovávání dat</h2>
          <p>Vaše data uchováváme po dobu trvání vašeho účtu. Po smazání účtu přejde váš profil do 30denní obnovovací lhůty. Po jejím uplynutí jsou všechna osobní data trvale odstraněna.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">5. Vaše práva</h2>
          <p>V souladu s GDPR máte právo na přístup ke svým osobním údajům, jejich opravu nebo výmaz. Pro uplatnění těchto práv nás kontaktujte na <a href="mailto:support@fulply.com" class="underline hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">support@fulply.com</a>.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">6. Kontakt</h2>
          <p>Máte-li dotazy týkající se ochrany osobních údajů, napište nám na <a href="mailto:support@fulply.com" class="underline hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">support@fulply.com</a>.</p>
        </section>
      </div>
    </template>

    <template v-else>
      <h1 class="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-12">Last updated: June 2026</p>

      <div class="space-y-10 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">1. Data We Collect</h2>
          <ul class="space-y-2 list-disc list-inside marker:text-neutral-400">
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Email address</span> — used for authentication and transactional emails.</li>
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Search queries</span> — the industry and location you search for.</li>
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Analysis results</span> — website scores and AI-generated notes stored against your account.</li>
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Usage data</span> — anonymous analytics (page views, feature usage) for improving the service.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">2. How We Use Your Data</h2>
          <p>We use your data solely to provide and improve the Fulply service and to send authentication emails. We do not sell your data to third parties.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">3. Third-Party Services</h2>
          <ul class="space-y-2 list-disc list-inside marker:text-neutral-400">
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Google Maps API</span> — to retrieve public business listings.</li>
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Google OAuth</span> — optional sign-in method.</li>
            <li><span class="font-medium text-neutral-900 dark:text-neutral-100">Cloudflare Turnstile</span> — bot protection on the sign-in form.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">4. Data Retention</h2>
          <p>We retain your data for as long as your account is active. When you delete your account, your profile enters a 30-day recovery period. After that period, all personal data is permanently deleted.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">5. Your Rights</h2>
          <p>Under GDPR, you have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:support@fulply.com" class="underline hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">support@fulply.com</a>.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">6. Contact</h2>
          <p>If you have any privacy-related questions, reach us at <a href="mailto:support@fulply.com" class="underline hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">support@fulply.com</a>.</p>
        </section>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'landing' })

const { locale } = useI18n()

useHead({ title: locale.value === 'cs' ? 'Zásady ochrany soukromí — Fulply' : 'Privacy Policy — Fulply' })
</script>
