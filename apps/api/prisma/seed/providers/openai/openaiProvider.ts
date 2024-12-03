import { prisma } from '../../../seed'
import { createCompletionAction } from './openaiActions'

export async function createOpenaiProvider() {
  const provider = await prisma.provider.create({
    data: {
      name: 'OpenAI',
      description:
        'OpenAI provider powerfull completion engine to help you create better content.',
      logo: 'openai-logo',
      premium: true,
    },
  })
  // Action
  await createCompletionAction(provider.id)
}
