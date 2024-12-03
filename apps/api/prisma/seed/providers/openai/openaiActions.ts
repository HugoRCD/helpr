import { prisma } from '../../../seed'

export async function createCompletionAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Generate content',
      description: 'Generate content with OpenAI\'s powerful completion engine.',
      endpoint: 'openai',
      name: 'create-completion',
      premium: true,
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Model',
            key: 'openai_model',
            value: '{openai_model}',
            type: 'select',
          },
          {
            title: 'Prompt',
            key: 'openai_prompt',
            value: '{openai_prompt}',
            type: 'textarea',
          },
          {
            title: 'Max tokens',
            key: 'openai_max_tokens',
            value: '{openai_max_tokens}',
            type: 'number',
          },
        ],
      },
    },
  })
}
