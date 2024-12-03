import { Role } from '~~/enums/Role'

export default defineNuxtRouteMiddleware(async () => {
  const user = await useUser()

  if (user?.role !== Role.ADMIN) {
    return '/'
  }
})
