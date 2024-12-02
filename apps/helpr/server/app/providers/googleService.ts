import { OAuth2Client } from 'google-auth-library'
import { GoogleTokens, GoogleUser } from '~/types/Google'

function getOauth2Client() {
  const { clientId } = useRuntimeConfig().private.google
  const { clientSecret } = useRuntimeConfig().private.google
  return new OAuth2Client(clientId, clientSecret, 'postmessage')
}

const client = getOauth2Client()

export async function getGoogleInfos(code: string) {
  const result = await client.getToken(code)
  client.setCredentials(result.tokens)
  if (!result.tokens.id_token) throw createError({ statusCode: 401, statusMessage: 'unauthorized' })
  const userInfo = await client.verifyIdToken({
    idToken: result.tokens.id_token,
    audience: useRuntimeConfig().private.google.clientId,
  })
  return {
    user: userInfo.getPayload() as GoogleUser,
    tokens: result.tokens as GoogleTokens,
  }
}

export async function isGoogleTokenValid(accessToken: string) {
  try {
    await client.getTokenInfo(accessToken)
    return true
  } catch (e) {
    return false
  }
}

export async function revokeGoogleToken(accessToken: string) {
  try {
    await client.revokeToken(accessToken)
    return true
  } catch (e) {
    return false
  }
}
