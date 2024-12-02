import { createUserInput } from '~~/server/api/user/user.dto'
import { User } from '~~/types/User'

export async function useSignup(createUserInput: createUserInput) {
  const toastStore = useToastStore()
  const { error, data } = await useFetch('/api/auth/signup', {
    method: 'POST',
    body: createUserInput,
  })
  if (error.value || !data.value) {
    toastStore.showErrorToast({ title: 'error.unknown_error' })
    return
  }
  toastStore.showSuccessToast({ title: 'signup.signup_success' })
  await useRouter().push('/auth/login')
}

export async function useUpdateUser() {
  const toastStore = useToastStore()
  const userStore = useUserStore()
  const user = userStore.getUser
  if (!user) return
  const { data: updatedUser, error } = await useFetch<User>(`/api/user/${user.id}`, {
    method: 'PUT',
    body: user,
  })
  if (error.value?.statusMessage === 'username_or_email_already_exists') {
    useErrorToast('Username already exists')
    return
  }
  if (!updatedUser.value) return
  userStore.setUser(updatedUser.value)
  toastStore.showSuccessToast({ title: 'profile.profile_update_success' })
}

export async function useDeleteUser() {
  const userStore = useUserStore()
  const user = userStore.getUser
  if (!user) return
  await useFetch('/api/user/' + user.id, {
    method: 'DELETE',
  })
  await useRouter().push('/')
  userStore.logout()
}
