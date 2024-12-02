import { H3Event } from 'h3'
import { isString } from '@vueuse/core'
import { getUserByAuthToken } from '~~/server/app/userService'
import type { User } from '~~/types/User'

export default eventHandler(async (event) => {
  const isAllowed = await protectAuthRoute(event)

  if (!isAllowed) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Unauthorized, please login',
      }),
    )
  }
})

async function protectAuthRoute(event: H3Event): Promise<User | null> {
  const protectedRoutes = ['/api/admin', '/api/user', '/api/stripe']

  if (event.path === undefined || !protectedRoutes.some((route) => event.path?.startsWith(route))) return null

  const authToken = getCookie(event, 'authToken')
  const hasAuthToken = isString(authToken)
  if (!hasAuthToken) return null
  return await getUserByAuthToken(authToken)
}
