<template>
  <div class="max-w-3xl mx-auto px-6 py-16">

    <template v-if="locale === 'cs'">
      <h1 class="text-3xl font-bold mb-2">Průvodce cold emailem: jak oslovit firmy ohledně jejich webu</h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-12">Praktický návod pro webdesignéry a freelancery</p>

      <div class="space-y-10 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">1. Ověřte kontaktní e-mail</h2>
          <p>Než cokoli odešlete, zkontrolujte, na koho píšete. Ideální je najít přímý e-mail majitele nebo odpovědné osoby — ne kontaktní formulář nebo obecnou adresu jako <em>info@</em>. Prohledejte web firmy, LinkedIn nebo patičku stránky. Personalizovaný e-mail na správnou osobu má výrazně vyšší šanci na odpověď než zpráva poslaná do prázdna.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">2. Zmiňte konkrétní problémy</h2>
          <p>Nejhorší cold emaily jsou generické: „Nabízím tvorbu webů, zajímáte se?" Nejlepší jsou konkrétní: „Váš web nemá SSL certifikát, prohlížeč ho označuje jako nezabezpečený — to zákazníky odrazuje ještě před prvním kliknutím." Čím konkrétněji popíšete, co jste na webu zjistili, tím víc je jasné, že jste si firmu skutečně prohlédli a nevysíláte hromadnou zprávu.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">3. Buďte struční</h2>
          <p>Optimální délka cold emailu jsou 3–4 odstavce. Jeden odstavec pro úvod a kontext, jeden nebo dva pro konkrétní problémy webu, jeden pro výzvu k akci. Delší e-mail snižuje pravděpodobnost, že ho příjemce dočte. Nepřesvědčujte — zvědavost stačí.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">4. Předmět jako od člověka</h2>
          <p>Vyhněte se předmětům jako „Nabídka redesignu webu" nebo „Spolupráce — webdesign". Ty okamžitě signalizují automatizovanou zprávu. Zkuste místo toho: „poznámka k Vašemu webu" nebo „krátký dotaz ohledně vašeho webu". Malé písmeno na začátku a přirozený jazyk působí jako osobní zpráva, ne jako kampaň.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">5. Pište z vlastní adresy</h2>
          <p>Vždy odesílejte z reálné e-mailové adresy, ne z <em>noreply@</em> nebo firemního newsletterového systému. Příjemce musí mít možnost jednoduše odpovědět. Pokud máte vlastní doménu (napr. <em>jan@janhorak.cz</em>), použijte ji — zvyšuje důvěryhodnost a snižuje šanci na přistání ve spamu.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">6. Jeden follow-up stačí</h2>
          <p>Pokud nedostanete odpověď do 5–7 dní, pošlete jeden stručný follow-up. Připomeňte se, nekritizujte. Více než jeden follow-up přechází do obtěžování a poškozuje dojem. Pokud ani pak neodpoví, přejděte dál — ne každá firma je teď správný timing.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Shrnutí</h2>
          <p>Úspěšný cold email není o objemu — je o relevanci. Jeden personalizovaný e-mail s konkrétními poznatky o webu firmy má větší šanci než sto generických zpráv. Fulply vám pomůže najít firmy s největším potenciálem a vygenerovat e-mail, který se hodí přesně jejich situaci.</p>
          <p class="mt-4">
            <NuxtLink to="/sign-in" class="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 underline transition-colors">Vyzkoušejte Fulply zdarma →</NuxtLink>
          </p>
        </section>
      </div>
    </template>

    <template v-else>
      <h1 class="text-3xl font-bold mb-2">Cold email guide: how to reach businesses about their website</h1>
      <p class="text-sm text-neutral-500 dark:text-neutral-400 mb-12">A practical guide for web designers and freelancers</p>

      <div class="space-y-10 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">1. Find the right contact</h2>
          <p>Before you send anything, check who you're writing to. The goal is a direct email to the owner or decision-maker — not a contact form or a generic <em>info@</em> address. Check the business's website, LinkedIn, or the footer of their page. A personalised email to the right person has a significantly higher chance of getting a reply than a message sent into the void.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">2. Mention specific issues</h2>
          <p>The worst cold emails are generic: "I build websites — are you interested?" The best ones are specific: "Your site doesn't have an SSL certificate — browsers flag it as insecure, which puts visitors off before they've read a single word." The more specifically you describe what you found on their website, the clearer it is that you actually looked — and didn't just fire off a mass message.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">3. Keep it short</h2>
          <p>The ideal cold email is 3–4 paragraphs. One for context, one or two for specific website issues, one for a call to action. Longer emails reduce the chance of the recipient reading to the end. You don't need to convince — just create enough curiosity that they want to reply.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">4. Write a subject line that sounds human</h2>
          <p>Avoid subject lines like "Website redesign proposal" or "Partnership enquiry — web design." These immediately signal an automated campaign. Try instead: "a note about your website" or "quick question about your site". A lowercase start and natural language reads like a personal message, not a bulk send.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">5. Send from a real address</h2>
          <p>Always send from a real email address — not <em>noreply@</em> or a newsletter platform. The recipient needs to be able to reply easily. If you have your own domain (e.g. <em>hello@yourname.com</em>), use it — it increases credibility and reduces the chance of landing in spam.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">6. One follow-up is enough</h2>
          <p>If you don't hear back within 5–7 days, send one short follow-up. A gentle reminder, nothing more. More than one follow-up crosses into harassment and damages your reputation. If there's still no reply, move on — not every business is the right timing right now.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Summary</h2>
          <p>A successful cold email isn't about volume — it's about relevance. One personalised email with specific observations about a business's website has a better chance than a hundred generic messages. Fulply helps you find businesses with the most potential and generate an email that fits their exact situation.</p>
          <p class="mt-4">
            <NuxtLink to="/sign-in" class="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 underline transition-colors">Try Fulply for free →</NuxtLink>
          </p>
        </section>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

definePageMeta({ layout: 'landing' })

useHead({
  title: locale.value === 'cs'
    ? 'Průvodce cold emailem — Fulply'
    : 'Cold Email Guide — Fulply',
})
</script>
