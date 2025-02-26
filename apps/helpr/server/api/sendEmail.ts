import { Resend } from 'resend'

const resend = new Resend(process.env.NUXT_PRIVATE_RESEND_API_KEY)

export default defineEventHandler(async () => {
  try {
    return await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      html: '<strong>It works!</strong>',
    })
  } catch (error) {
    return { error }
  }
})
