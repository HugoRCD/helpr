import { prisma } from '../../../seed'
import { createPostAction } from './linkedinActions'

export async function createLinkedinProvider() {
  const provider = await prisma.provider.create({
    data: {
      name: 'Linkedin',
      description: 'Linkeding is the world\'s largest professional network.',
      logo: 'linkedin-logo',
    },
  })
  // Action
  await createPostAction(provider.id)
}
