import { prisma } from '../../../seed'

export async function createTicketAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create Ticket',
      description: 'Create a ticket on Linear',
      endpoint: 'linear',
      name: 'create-ticket',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Ticket title',
            key: 'linear_ticket_title',
            value: '{linear_ticket_title}',
          },
          {
            title: 'Ticket description',
            key: 'linear_ticket_description',
            value: '{linear_ticket_description}',
            type: 'textarea',
            required: false,
          },
          {
            title: 'Ticket assignee',
            key: 'linear_ticket_assignee_id',
            value: '{linear_ticket_assignee_id}',
            type: 'select',
            required: false,
          },
          {
            title: 'Ticket labels',
            key: 'linear_ticket_labels_id',
            value: '{linear_ticket_labels_id}',
            type: 'select',
            required: false,
          },
          {
            title: 'Team',
            key: 'linear_team_id',
            value: '{linear_team_id}',
            type: 'select',
          },
          {
            title: 'Ticket state',
            key: 'linear_ticket_state_id',
            value: '{linear_ticket_state_id}',
            type: 'select',
            required: false,
          },
          {
            title: 'Cycles',
            key: 'linear_cycles_id',
            value: '{linear_cycles_id}',
            type: 'select',
            required: false,
          },
        ],
      },
    },
  })
}

export async function createProjectAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create Project',
      description: 'Create a project on Linear',
      endpoint: 'linear',
      name: 'create-project',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Project title',
            key: 'linear_project_title',
            value: '{linear_project_title}',
          },
          {
            title: 'Project description',
            key: 'linear_project_description',
            value: '{linear_project_description}',
            type: 'textarea',
            required: false,
          },
          {
            title: 'Team',
            key: 'linear_team_id',
            value: '{linear_team_id}',
            type: 'select',
          },
        ],
      },
    },
  })
}
