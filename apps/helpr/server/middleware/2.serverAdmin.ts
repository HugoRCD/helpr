import { adminCheck } from '~~/server/app/userService'

export default defineEventHandler(async (event) => {
  const protectedRoutes = ['/api/admin']

  if (!protectedRoutes.some((route) => event.path?.startsWith(route))) return

  return await adminCheck(event)
})
