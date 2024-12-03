import { prisma } from '../../../seed'

export async function createPostAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Post on Linkedin',
      description: 'Post a message on Linkedin',
      endpoint: 'linkedin',
      name: 'create-post',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Post content',
            key: 'linkedin_post_content',
            value: '{linkedin_post_content}',
            type: 'textarea',
            required: true,
          },
        ],
      },
    },
  })
}
