import { prisma } from '../../../seed'

export async function translateTextAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Translate content',
      description: 'Translate text from one language to another',
      endpoint: 'deepl',
      name: 'translate',
      providerId: providerId,
      premium: true,
      variables: {
        create: [
          {
            title: 'Deepl text',
            key: 'deepl_text',
            value: '{deepl_text}',
          },
          {
            title: 'Deepl source language',
            key: 'deepl_source_lang',
            value: '{deepl_source_lang}',
            type: 'select',
          },
          {
            title: 'Deepl target language',
            key: 'deepl_target_lang',
            value: '{deepl_target_lang}',
            type: 'select',
          },
          {
            title: 'Deepl Response',
            key: 'deepl_response',
            value: '{deepl_response}',
          },
        ],
      },
    },
  })
}
