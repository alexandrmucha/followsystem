import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },

  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/turnstile',
    'nuxt-lucide-icons',
  ],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: "en-US", name: 'English', file: 'en.json' },
      { code: 'cs', language: "cs-CZ", name: 'Čeština', file: 'cs.json' }
    ],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3001'
    }
  },
  turnstile: {
    siteKey: '1x00000000000000000000BB',
  },
})