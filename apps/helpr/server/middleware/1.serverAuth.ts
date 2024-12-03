import { getUserByAuthToken } from '~~/server/app/userService'

export default defineEventHandler(async (event) => {
  const protectedRoutes = ['/api/admin', '/api/user', '/api/stripe']

  if (!protectedRoutes.some((route) => event.path?.startsWith(route))) return


  const authToken = getCookie(event, 'authToken')
  if (!authToken) return null
  return await getUserByAuthToken(authToken)
})
