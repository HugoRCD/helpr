import { H3Event } from 'h3'
import { getResetPasswordByToken, updatePassword } from '~/server/app/authService'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  const newPassword = body.password
  const { token } = body
  const userId = await getResetPasswordByToken(token)
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'There is no user with this token',
    })
  }
  await updatePassword(userId, newPassword)
  return { statusCode: 200, body: { message: 'Password changed' } }
})
