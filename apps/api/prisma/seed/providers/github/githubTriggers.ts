import { prisma } from '../../../seed'

export async function issueCreatedTrigger(providerId: number) {
  return await prisma.trigger.create({
    data: {
      title: 'On issue created',
      key: 'issue-created',
      description: 'Triggered when an issue is created',
      value: 'issue-created',
      providerId: providerId,
      provider: 'github',
      webhook: true,
      variables: {
        create: [
          {
            title: 'Last issue title',
            key: 'github_issue_title',
            value: '{last_github_issue_title}',
          },
          {
            title: 'Last issue body',
            key: 'github_issue_body',
            value: '{last_github_issue_body}',
          },
          {
            title: 'Repository name',
            key: 'github_repository',
            value: '{github_repository}',
            type: 'select',
            webhook: true,
          },
        ],
      },
    },
  })
}

export async function pullRequestCreatedTrigger(providerId: number) {
  return await prisma.trigger.create({
    data: {
      title: 'On pull request created',
      key: 'pull-request-created',
      description: 'Triggered when a pull request is created',
      value: 'pull-request-created',
      providerId: providerId,
      provider: 'github',
      webhook: true,
      variables: {
        create: [
          {
            title: 'Last pull request title',
            key: 'github_pull_request_title',
            value: '{last_github_pull_request_title}',
          },
          {
            title: 'Last pull request body',
            key: 'github_pull_request_body',
            value: '{last_github_pull_request_body}',
          },
          {
            title: 'Repository name',
            key: 'github_repository',
            value: '{github_repository}',
            type: 'select',
            webhook: true,
          },
        ],
      },
    },
  })
}
