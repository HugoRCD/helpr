export const config = () => ({
  env: process.env.APP_ENV,
  jwt: {
    auth_token_secret: process.env.NUXT_PRIVATE_AUTH_SECRET,
    refresh_token_secret: process.env.NUXT_PRIVATE_REFRESH_SECRET,
    auth_token_expiration: process.env.NUXT_PRIVATE_AUTH_EXPIRATION,
    refresh_token_expiration: process.env.NUXT_PRIVATE_REFRESH_EXPIRATION,
  },
  mailer: {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      password: process.env.MAILER_PASSWORD,
    },
  },
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY,
  },
  slack: {
    bot_access_token: process.env.SLACK_BOT_ACCESS_TOKEN,
  },
  openai: {
    api_key: process.env.OPENAI_API_KEY,
  },
  deepl: {
    api_key: process.env.DEEPL_API_KEY,
  },
  google: {
    client_id: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
    client_secret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
    callback_url: process.env.GOOGLE_CALLBACK_URL,
  },
  frontend_url: process.env.FRONTEND_URL,
  api_url: process.env.API_URL,
  cookie_domain: process.env.COOKIE_DOMAIN,
})
