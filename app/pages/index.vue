<template>
  <div class="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">

    <LandingNavbar />
    <LandingHero />

    <!-- HOW IT WORKS -->
    <section class="py-20 px-6 bg-neutral-50 dark:bg-neutral-900">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-3">How it works</h2>
          <p class="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">Three steps from search to outreach.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div v-for="step in steps" :key="step.number" class="flex flex-col items-start">
            <div class="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mb-4 shrink-0">
              {{ step.number }}
            </div>
            <h3 class="text-base font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="py-20 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-3">What Fulply analyzes</h2>
          <p class="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">A comprehensive analysis of every website — so your outreach is accurate and persuasive.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="feature in features" :key="feature.title" class="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <component :is="feature.icon" :size="20" class="text-indigo-500 mb-3" />
            <h3 class="font-semibold text-sm mb-1">{{ feature.title }}</h3>
            <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="py-20 px-6 bg-neutral-50 dark:bg-neutral-900">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Start getting clients today.</h2>
        <p class="text-neutral-600 dark:text-neutral-400 mb-8">No credit card. No setup. Just sign in.</p>
        <button
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/20"
          @click="navigateTo('/sign-in')"
        >
          Try for free
          <LucideArrowRight :size="16" />
        </button>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-neutral-200 dark:border-neutral-800 py-8 px-6">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-500 dark:text-neutral-400">
        <UiLogo />
        <a href="mailto:support@fulply.com" class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          support@fulply.com
        </a>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Fulply — Get clients who actually need a new website' })

const steps = [
  {
    number: '1',
    title: 'Enter your industry and location',
    description: 'Type something like "plumber London" and Fulply instantly finds relevant businesses from Google Maps.',
  },
  {
    number: '2',
    title: 'AI analyzes their websites',
    description: 'Automatically checks performance, SEO, SSL, responsiveness, design and dozens of other parameters. Each lead gets a score.',
  },
  {
    number: '3',
    title: 'Send a personalized email',
    description: 'AI writes an outreach email tailored to the specific issues of each business\'s website. You just hit send.',
  },
]

const features = [
  {
    icon: resolveComponent('LucideZap'),
    title: 'Website performance',
    description: 'PageSpeed scores for mobile and desktop according to Google Lighthouse.',
  },
  {
    icon: resolveComponent('LucideSearch'),
    title: 'SEO analysis',
    description: 'SEO score, accessibility and best practices for modern websites.',
  },
  {
    icon: resolveComponent('LucideLock'),
    title: 'Security',
    description: 'SSL certificate check, server errors and security risks.',
  },
  {
    icon: resolveComponent('LucideSmartphone'),
    title: 'Mobile experience',
    description: 'Detection of responsiveness and missing calls-to-action on mobile devices.',
  },
  {
    icon: resolveComponent('LucidePaintbrush'),
    title: 'AI design score',
    description: 'AI evaluates the visual design, copywriting and overall impression of the website.',
  },
  {
    icon: resolveComponent('LucideTarget'),
    title: 'Lead score',
    description: 'Each business gets an overall potential score so you know who to contact first.',
  },
  {
    icon: resolveComponent('LucideMail'),
    title: 'Email generation',
    description: 'AI writes a personalized outreach email based on the specific weaknesses of each website.',
  },
  {
    icon: resolveComponent('LucideDownload'),
    title: 'CSV export',
    description: 'Export results including contacts to CSV for use in your CRM or email tool.',
  },
  {
    icon: resolveComponent('LucideHistory'),
    title: 'Search history',
    description: 'Overview of all searches from the last 30 days. Marked contacts are saved permanently.',
  },
]
</script>
