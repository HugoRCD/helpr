import { prisma } from '../../../seed'

export async function ticketCreatedTrigger(providerId: number) {
  return await prisma.trigger.create({
    data: {
      title: 'On ticket created',
      key: 'ticket-created',
      description: 'Triggered when a ticket is created',
      value: 'ticket-created',
      providerId: providerId,
      provider: 'linear',
      webhook: true,
      variables: {
        create: [
          {
            title: 'Last ticket title',
            key: 'linear_ticket_title',
            value: '{last_linear_ticket_title}',
          },
          {
            title: 'Last ticket description',
            key: 'linear_ticket_description',
            value: '{last_linear_ticket_description}',
          },
          {
            title: 'Last ticket number',
            key: 'linear_ticket_number',
            value: '{last_linear_ticket_number}',
          },
          {
            title: 'Team',
            key: 'linear_team_id',
            value: '{linear_team_id}',
            type: 'select',
            webhook: true,
          },
        ],
      },
    },
  })
}

export async function projectCreatedTrigger(providerId: number) {
  return await prisma.trigger.create({
    data: {
      title: 'On project created',
      key: 'project-created',
      description: 'Triggered when a project is created',
      value: 'project-created',
      providerId: providerId,
      provider: 'linear',
      webhook: true,
      variables: {
        create: [
          {
            title: 'Last project title',
            key: 'linear_project_title',
            value: '{last_linear_project_title}',
          },
          {
            title: 'Last project description',
            key: 'linear_project_description',
            value: '{last_linear_project_description}',
          },
          {
            title: 'Team',
            key: 'linear_team_id',
            value: '{linear_team_id}',
            type: 'select',
            webhook: true,
          },
        ],
      },
    },
  })
}
