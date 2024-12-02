import { H3Event } from 'h3'
import { getUserByLogin } from '~~/server/app/userService'
import resetPassword from '~~/server/api/mailer/templates/reset-password'
import { sendGmail } from '~~/server/app/mailerService'
import { generateResetPasswordToken } from '~~/server/app/authService'

export default eventHandler(async (event: H3Event) => {
  const userEmail = event.context.params.email
  const user = await getUserByLogin(userEmail)
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }
  const token = await generateResetPasswordToken(user.id)
  const { appDomain } = useRuntimeConfig().public
  const url = `${appDomain}/password/reset-${token}`
  await sendGmail({
    template: resetPassword(userEmail, url),
    to: userEmail,
    from: useRuntimeConfig().mailerUser,
    subject: 'Reset your password',
  })
  return { statusCode: 200, body: { message: 'Email sent' } }
})
