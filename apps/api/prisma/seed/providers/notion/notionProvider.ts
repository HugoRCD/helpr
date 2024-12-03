import { prisma } from '../../../seed'
import {
  createCommentAction,
  createDatabaseAction,
  createItemInDatabaseAction,
} from './notionActions'

export async function createNotionProvider() {
  const provider = await prisma.provider.create({
    data: {
      name: 'Notion',
      description:
        'Create databases, add items to databases, comments, and more with Notion.',
      logo: 'notion-logo',
      tokenLink: 'https://www.notion.so/my-integrations',
    },
  })
  // Actions
  await createItemInDatabaseAction(provider.id)
  await createDatabaseAction(provider.id)
  await createCommentAction(provider.id)
}
