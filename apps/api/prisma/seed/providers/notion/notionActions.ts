import { prisma } from '../../../seed'

export async function createItemInDatabaseAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create item in database',
      description: 'Create an item in a Notion database',
      endpoint: 'notion',
      name: 'create-item',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Database',
            key: 'notion_item_databaseId',
            value: '{notion_item_databaseId}',
            type: 'select',
          },
          {
            title: 'Item title',
            key: 'notion_item_title',
            value: '{notion_item_title}',
          },
          {
            title: 'Item description',
            key: 'notion_item_description',
            value: '{notion_item_description}',
            type: 'textarea',
          },
        ],
      },
    },
  })
}

export async function createDatabaseAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create database',
      description: 'Create a database',
      endpoint: 'notion',
      name: 'create-database',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Database Page',
            key: 'notion_database_pageId',
            value: '{notion_database_pageId}',
            type: 'select',
          },
          {
            title: 'Database title',
            key: 'notion_database_title',
            value: '{notion_database_title}',
          },
          {
            title: 'Database description',
            key: 'notion_database_description',
            value: '{notion_database_description}',
            type: 'textarea',
            required: false,
          },
        ],
      },
    },
  })
}

export async function createCommentAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create comment',
      description: 'Create a comment on a Notion page',
      endpoint: 'notion',
      name: 'create-comment',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Comment Page',
            key: 'notion_comment_pageId',
            value: '{notion_comment_pageId}',
            type: 'select',
          },
          {
            title: 'Comment text',
            key: 'notion_comment_text',
            value: '{notion_comment_text}',
            type: 'textarea',
          },
        ],
      },
    },
  })
}
