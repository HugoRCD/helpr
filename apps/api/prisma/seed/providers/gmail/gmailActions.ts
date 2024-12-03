import { prisma } from '../../../seed'

export async function sendMailAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Send Mail',
      description: 'Send a mail in Gmail',
      endpoint: 'gmail',
      name: 'send-mail',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Send mail to',
            key: 'gmail_mail_to',
            value: '{gmail_mail_to}',
            required: true,
          },
          {
            title: 'Send mail subject',
            key: 'gmail_mail_subject',
            value: '{gmail_mail_subject}',
            required: true,
          },
          {
            title: 'Send mail body',
            key: 'gmail_mail_body',
            value: '{gmail_mail_body}',
            type: 'textarea',
            required: true,
          },
        ],
      },
    },
  })
}

export async function createDraftAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create Draft',
      description: 'Create a draft in Gmail',
      endpoint: 'gmail',
      name: 'create-draft',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Send draft to',
            key: 'gmail_draft_to',
            value: '{gmail_draft_to}',
            required: true,
          },
          {
            title: 'Send draft subject',
            key: 'gmail_draft_subject',
            value: '{gmail_draft_subject}',
            required: true,
          },
          {
            title: 'Send draft body',
            key: 'gmail_draft_body',
            value: '{gmail_draft_body}',
            type: 'textarea',
            required: true,
          },
        ],
      },
    },
  })
}
