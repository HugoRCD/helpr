import { prisma } from '../../../seed'

export async function createBranchAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create Branch',
      description: 'Create a branch on GitHub',
      endpoint: 'github',
      name: 'create-branch',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'New branch name',
            key: 'github_branch_name',
            value: '{github_branch_name}',
          },
          {
            title: 'From branch',
            key: 'github_from_branch',
            value: '{github_from_branch}',
            type: 'select',
          },
          {
            title: 'Repository name',
            key: 'github_repository',
            value: '{github_repository}',
            type: 'select',
          },
        ],
      },
    },
  })
}

export async function createIssueAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create issue',
      description: 'Create an issue on GitHub',
      endpoint: 'github',
      name: 'create-issue',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Issue title',
            key: 'github_issue_title',
            value: '{github_issue_title}',
          },
          {
            title: 'Issue body',
            key: 'github_issue_body',
            value: '{github_issue_body}',
            type: 'textarea',
            required: false,
          },
          {
            title: 'Labels',
            key: 'github_issue_labels',
            value: '{github_issue_labels}',
            type: 'select',
            required: false,
          },
          {
            title: 'Repository name',
            key: 'github_repository',
            value: '{github_repository}',
            type: 'select',
          },
        ],
      },
    },
  })
}

export async function createReleaseAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create release',
      description: 'Create a release on GitHub',
      endpoint: 'github',
      name: 'create-release',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Release title',
            key: 'github_release_title',
            value: '{github_release_title}',
          },
          {
            title: 'Release body',
            key: 'github_release_body',
            value: '{github_release_body}',
            type: 'textarea',
            required: false,
          },
          {
            title: 'Release tag',
            key: 'github_release_tag',
            value: '{github_release_tag}',
          },
          {
            title: 'Draft',
            key: 'github_release_draft',
            value: '{github_release_draft}',
            type: 'boolean',
            required: false,
          },
          {
            title: 'Target commitish',
            key: 'github_release_target_commitish',
            value: '{github_release_target_commitish}',
            type: 'select',
          },
          {
            title: 'Repository name',
            key: 'github_repository',
            value: '{github_repository}',
            type: 'select',
          },
        ],
      },
    },
  })
}

export async function createPullRequestAction(providerId: number) {
  return await prisma.action.create({
    data: {
      title: 'Create pull request',
      description: 'Create a pull request on GitHub',
      endpoint: 'github',
      name: 'create-pull-request',
      providerId: providerId,
      variables: {
        create: [
          {
            title: 'Pull request title',
            key: 'github_pull_request_title',
            value: '{github_pull_request_title}',
          },
          {
            title: 'Pull request body',
            key: 'github_pull_request_body',
            value: '{github_pull_request_body}',
            type: 'textarea',
            required: false,
          },
          {
            title: 'Pull request head',
            key: 'github_pull_request_head',
            value: '{github_pull_request_head}',
            type: 'select',
          },
          {
            title: 'Pull request base',
            key: 'github_pull_request_base',
            value: '{github_pull_request_base}',
            type: 'select',
          },
          {
            title: 'Repository name',
            key: 'github_repository',
            value: '{github_repository}',
            type: 'select',
          },
        ],
      },
    },
  })
}
