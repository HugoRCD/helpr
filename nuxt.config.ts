import messages from "./locales/messages";

export default defineNuxtConfig({
  app: {
    layoutTransition: {
      name: "fade",
      mode: "out-in",
    },
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
  },
  css: ["~/assets/style/main.scss"],

  imports: {
    dirs: ["store"],
  },

  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/image-edge",
    "@nuxtjs/robots",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-vue3-google-signin",
    "nuxt-headlessui",
    "nuxt-mailer",
  ],

  colorMode: {
    preference: "cosmos",
    fallback: "cosmos",
    classSuffix: "",
    storageKey: "helpr-color-mode",
  },

  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },

  runtimeConfig: {
    mailerUser: process.env.MAILER_USER,
    mailerPass: process.env.MAILER_PASSWORD,
    private: {
      authSecret: process.env.AUTH_TOKEN_SECRET,
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
      resendApiKey: process.env.RESEND_API_KEY,
      encryptionKey: process.env.ENCRYPTION_KEY,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      openAiKey: process.env.OPENAI_API_KEY,
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      linear: {
        apiKey: process.env.LINEAR_API_KEY,
        clientId: process.env.LINEAR_CLIENT_ID,
        clientSecret: process.env.LINEAR_CLIENT_SECRET,
        callbackUrl: process.env.LINEAR_CALLBACK_URL,
      },
    },
    public: {
      invitationCode: process.env.INVITATION_CODE,
      releaseDate: process.env.RELEASE_DATE,
      appDomain: process.env.FRONTEND_URL,
      appEnv: process.env.APP_ENV,
      apiUrl: process.env.API_URL,
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    },
  },

  i18n: {
    strategy: "no_prefix",
    detectBrowserLanguage: {
      alwaysRedirect: true,
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    locales: [
      {
        code: "en",
        iso: "en-US",
      },
      {
        code: "fr",
        iso: "fr-FR",
      },
    ],
    baseUrl: "https://helpr.tech",
    vueI18n: {
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en", "fr"],
      messages: messages,
    },
  },

  robots: {
    UserAgent: "*",
    Disallow: "/app",
  },

  plugins: [{ src: "~/plugins/vercel.ts", mode: "client" }],
});
