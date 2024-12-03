export async function getLinkedinToken(code: string) {
  const linkedinConfig = useRuntimeConfig().public.linkedin
  const req = new XMLHttpRequest()
  const url = 'https://www.linkedin.com/oauth/v2/accessToken'
  req.open('POST', url, true)
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  req.send(
    'grant_type=authorization_code&code=' +
      code +
      '&client_id=' +
      linkedinConfig.clientId +
      '&client_secret=' +
      linkedinConfig.clientSecret +
      '&redirect_uri=' +
      linkedinConfig.callbackUrl,
  )
  req.onreadystatechange = async function() {
    if (req.readyState === 4) {
      const response = JSON.parse(req.responseText)
      console.log(response)
      if (response.access_token) {
        await addCredentials('linkedin', response.access_token)
      }
    }
  }
}
