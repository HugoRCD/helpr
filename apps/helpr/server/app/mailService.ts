import { Resend } from 'resend'

const resend = new Resend(process.env.NUXT_PRIVATE_RESEND_API_KEY)

export async function sendMagicLink(email: string, magicLink: string) {
  const frontendUrl = useRuntimeConfig().public.appUrl
  return await resend.emails.send({
    from: 'contact@hrcd.fr',
    to: [email],
    subject: 'Helpr - Magic Link',
    html: `<a href="${frontendUrl}/auth/connect?token=${magicLink}">Click here to login</a>`,
  })
}
