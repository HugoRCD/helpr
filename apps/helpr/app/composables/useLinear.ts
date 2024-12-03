export async function useLinearOauth() {
  const linearConfig = useRuntimeConfig().public.linear
  const response = await $fetch('https://linear.app/oauth/authorize', {
    method: 'GET',
    query: {
      client_id: linearConfig.clientId,
      client_secret: linearConfig.clientSecret,
      redirect_uri: linearConfig.callbackUrl,
      response_type: 'code',
      scope: 'read,write',
    },
  })
  console.log(response)
}

export async function getLinearToken(code: string) {
  const linearConfig = useRuntimeConfig().public.linear
  const response = await $fetch('https://api.linear.app/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      code: code,
      client_id: linearConfig.clientId,
      client_secret: linearConfig.clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: linearConfig.callbackUrl,
    },
  })
  console.log(response)
}
