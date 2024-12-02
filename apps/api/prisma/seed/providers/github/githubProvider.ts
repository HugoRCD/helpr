import { prisma } from "../../../seed";
import {
  createBranchAction,
  createIssueAction,
  createPullRequestAction,
  createReleaseAction,
} from "./githubActions";
import {
  issueCreatedTrigger,
  pullRequestCreatedTrigger,
} from "./githubTriggers";

export async function createGithubProvider() {
  const provider = await prisma.provider.create({
    data: {
      name: "Github",
      description: "Create branches, issues, pull requests, etc... on GitHub",
      logo: "github-logo",
      tokenLink: "https://github.com/settings/tokens?type=beta",
    },
  });
  // Actions
  await createBranchAction(provider.id);
  await createIssueAction(provider.id);
  await createPullRequestAction(provider.id);
  await createReleaseAction(provider.id);

  // Triggers
  await issueCreatedTrigger(provider.id);
  await pullRequestCreatedTrigger(provider.id);
}
