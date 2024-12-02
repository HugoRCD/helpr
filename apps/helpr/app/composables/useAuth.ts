import type { User } from '~~/types/User'

export async function useUser(): Promise<User | null> {
  const authCookie = useCookie('authToken').value
  const user = useUserStore().getUser

  if (authCookie && !user) {
    const cookieHeaders = useRequestHeaders(['cookie'])
    const { data } = await useFetch<User>('/api/auth/currentUser', {
      method: 'GET',
      headers: cookieHeaders as HeadersInit,
    })
    if (!data.value) {
      return null
    }
    useUserStore().setUser(data.value)
  }
  return user
}

export async function useSignin(login: string, password: string): Promise<void> {
  const toastStore = useToastStore()
  const { data } = await useFetch<User>('/api/auth/login', {
    method: 'POST',
    body: {
      login: login,
      password: password,
    },
  })
  if (data.value) {
    toastStore.showSuccessToast({ title: 'login.welcome_back', info: data.value.username })
    useUserStore().setUser(data.value)
  } else {
    toastStore.showErrorToast({ title: 'error.unknown_error' })
  }
}

export async function useLogout(): Promise<void> {
  const userStore = useUserStore()
  const toastStore = useToastStore()
  await useFetch('/api/auth/logout', {
    method: 'POST',
  })
  toastStore.showSuccessToast({ title: 'profile.logout', info: userStore.getUser?.username })
  userStore.logout()
  await useRouter().push('/auth/login')
}
