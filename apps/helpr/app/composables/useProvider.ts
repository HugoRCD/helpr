export async function addCredentials(provider: string, accessToken: string) {
  const url = `/${provider}/add-credentials`
  const res = await useAPI(url, 'POST', {
    accessToken: accessToken,
  })
  console.log(res)
}

export async function removeCredentials(provider: string) {
  const url = '/provider/deconnect'
  const { data } = await useAPI<ApiResponse>(url, 'DELETE', {
    provider: provider.toLowerCase(),
  })
  if (data) useSuccessToast('Provider disconnected')
  else useErrorToast('Error while disconnecting provider')
}

export async function getUserProviders() {
  const url = '/provider/user'
  const { data: services } = await useAPI<ApiResponse>(url, 'GET')
  return services
}

export async function getProviders() {
  const url = '/provider/providers'
  const { data: providers } = await useAPI<ApiResponse>(url, 'GET')
  return providers
}
