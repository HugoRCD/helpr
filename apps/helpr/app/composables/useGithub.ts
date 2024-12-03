export async function getGithubToken(code: string) {
  const githubConfig = useRuntimeConfig().public.github
  const req = new XMLHttpRequest()
  req.open('POST', 'https://github.com/login/oauth/access_token', true)
  req.setRequestHeader('Accept', 'application/json')
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  req.send(
    'code=' +
      code +
      '&client_id=' +
      githubConfig.clientId +
      '&client_secret=' +
      githubConfig.clientSecret +
      '&redirect_uri=' +
      githubConfig.callbackUrl,
  )
  req.onreadystatechange = async function() {
    if (req.readyState === 4) {
      const response = JSON.parse(req.responseText)
      if (response.access_token) {
        await addCredentials('github', response.access_token)
      }
    }
  }
}
