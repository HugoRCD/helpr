export default defineNuxtConfig({
  app: {
    layoutTransition: {
      name: 'fade',
      mode: 'out-in',
    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  css: ['~/assets/style/main.css'],

  devtools: { enabled: true },

  compatibilityDate: '2024-11-06',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-vue3-google-signin',
    'nuxt-headlessui',
    'nuxt-mailer',
    '@nuxtjs/i18n',
  ],

  colorMode: {
    preference: 'cosmos',
    fallback: 'cosmos',
    classSuffix: '',
    storageKey: 'helpr-color-mode',
  },

  googleSignIn: {
    clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
  },

  runtimeConfig: {
    private: {
      resendApiKey: '',
      authSecret: '',
      refreshSecret: '',
      encryptionKey: '',
      stripeSecretKey: '',
      openAiKey: '',
      deeplApiKey: '',
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
      },
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
      },
    },
    public: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
      },
      invitationCode: '',
      appEnv: process.env.NODE_ENV,
      apiUrl: '',
      appUrl: process.env.NUXT_APP_URL || 'http://localhost:3000',
    },
  },

  i18n: {
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
      },
    ],
    baseUrl: 'https://helpr.hrcd.fr',
    vueI18n: '~/i18n.config.ts',
  }
})
