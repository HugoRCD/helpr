import { BadRequestException, Injectable } from "@nestjs/common";
import { MailingService } from "../mailing/mailing.service";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma.service";
import { UserService } from "../user/user.service";
import { Octokit } from "octokit";
import { ProviderService } from "../provider/provider.service";
import {
  createReleaseInput,
  createBranchInput,
  createPullRequestInput,
  createIssueInput,
} from "./github.type";
import { NgrokService } from "../ngrok";
import { Status, Trigger } from "../flow/flow.type";
import { FlowService } from "../flow/flow.service";

@Injectable()
export class GithubService {
  constructor(
    private prisma: PrismaService,
    private mailingService: MailingService,
    private configService: ConfigService,
    private userService: UserService,
    private providerService: ProviderService,
    private flowService: FlowService,
  ) {}

  checkIfWebhookExists(webhook, repo: string, url: string) {
    if (!webhook) {
      return false;
    }
    const { config, events } = webhook;
    return !!(config.url === url && events.includes("push"));
  }

  /**
   * Create a webhook GitHub
   * @param userId
   * @param name
   * @param where
   */
  async createWebhook(
    userId: number,
    name: string,
    where: string,
  ): Promise<any> {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      "github",
      true,
    );
    const githubClient = new Octokit({
      auth: accessToken,
    });
    const user = await this.getUser(userId, accessToken);
    const env = this.configService.get("env");
    const webhookProdUrl =
      this.configService.get("api_url") + "/github/webhook";
    const ngrokUrl = "https://0d95-78-126-205-77.eu.ngrok.io/github/webhook";
    const finalUrl = env === "production" ? webhookProdUrl : ngrokUrl;
    const webhooks = await githubClient.request(
      "GET /repos/{owner}/{repo}/hooks",
      {
        owner: user.login,
        repo: where,
      },
    );
    const webhookExist = this.checkIfWebhookExists(
      webhooks.data[0],
      where,
      finalUrl,
    );
    if (webhookExist) {
      return {
        message: "webhook_already_exists",
      };
    }
    return await githubClient.request("POST /repos/{owner}/{repo}/hooks", {
      owner: user.login,
      repo: where,
      name: "web",
      active: true,
      events: ["push", "pull_request", "issues"],
      config: {
        url: finalUrl,
        content_type: "json",
        insecure_ssl: "0",
      },
    });
  }

  async issueTriggered(body: any) {
    const { repository } = body;
    const { owner } = repository;
    const { id } = owner;
    const user = await this.userService.getUserByProviderId(id.toString());
    const { data: flows } = await this.flowService.getFlowsToTrigger(
      Trigger.ISSUE_CREATED,
      user.id,
    );
    const last_github_issue_title = body.issue.title;
    const last_github_issue_body = body.issue.body;
    const github_repository = repository.name;
    const variables = [
      {
        key: "last_github_issue_title",
        value: last_github_issue_title,
      },
      {
        key: "last_github_issue_body",
        value: last_github_issue_body,
      },
      {
        key: "github_repository",
        value: github_repository,
      },
    ];
    for (const flow of flows) {
      await this.flowService.updateFlowStatus(flow.id, Status.READY);
      await this.flowService.addFlowData(flow.id, variables);
    }
  }

  async pullRequestTriggered(body: any) {
    const { repository } = body;
    const { owner } = repository;
    const { id } = owner;
    const user = await this.userService.getUserByProviderId(id.toString());
    const { data: flows } = await this.flowService.getFlowsToTrigger(
      Trigger.PULL_REQUEST_CREATED,
      user.id,
    );
    const last_github_pull_request_title = body.pull_request.title;
    const last_github_pull_request_body = body.pull_request.body;
    const github_repository = repository.name;
    const variables = [
      {
        key: "last_github_pull_request_title",
        value: last_github_pull_request_title,
      },
      {
        key: "last_github_pull_request_body",
        value: last_github_pull_request_body,
      },
      {
        key: "github_repository",
        value: github_repository,
      },
    ];
    for (const flow of flows) {
      await this.flowService.updateFlowStatus(flow.id, Status.READY);
      await this.flowService.addFlowData(flow.id, variables);
    }
  }

  async handleWebhook(body: any) {
    if (body.action === "opened" && body.issue) {
      await this.issueTriggered(body);
    }
    if (body.action === "opened" && body.pull_request) {
      await this.pullRequestTriggered(body);
    }
  }

  async createCredentials(userId: number, accessToken: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new BadRequestException("User not found");
    const octokit = new Octokit({
      auth: accessToken,
    });
    const githubResponse = await octokit.request("GET /user");
    const githubUser = githubResponse.data;
    if (!githubUser) throw new BadRequestException("Invalid access token");
    return await this.providerService.addCredentials(
      user.id,
      githubUser.id.toString(),
      "github",
      accessToken,
    );
  }

  async getUser(userId: number, accessToken: string) {
    const octokit = new Octokit({
      auth: accessToken,
    });
    const githubResponse = await octokit.request("GET /user");
    const githubUser = githubResponse.data;
    if (!githubUser) throw new BadRequestException("Invalid access token");
    return githubUser;
  }

  async createBranch(userId: number, createBranchInput: createBranchInput) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      "github",
      true,
    );
    const octokit = new Octokit({ auth: accessToken });
    const user = await this.getUser(userId, accessToken);
    const { data: latestCommit } = await octokit.rest.repos.getBranch({
      owner: user.login,
      repo: createBranchInput.github_repository,
      branch: createBranchInput.github_from_branch,
    });

    createBranchInput.github_branch_name = createBranchInput.github_branch_name
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();

    await octokit.rest.git.createRef({
      owner: user.login,
      repo: createBranchInput.github_repository,
      ref: `refs/heads/${createBranchInput.github_branch_name}`,
      sha: latestCommit.commit.sha,
    });

    return {
      message: "branch_created",
    };
  }

  async createRelease(userId: number, createRealeaseInput: createReleaseInput) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      "github",
      true,
    );
    const octokit = new Octokit({ auth: accessToken });
    const user = await this.getUser(userId, accessToken);
    const releaseData = {
      owner: user.login,
      repo: createRealeaseInput.github_repository,
      tag_name: createRealeaseInput.github_release_tag,
      target_commitish: createRealeaseInput.github_release_target_commitish,
      name: createRealeaseInput.github_release_title,
      body: createRealeaseInput.github_release_body || "",
      draft: createRealeaseInput.github_release_draft || false,
    };
    try {
      const response = await octokit.rest.repos.createRelease(releaseData);
      return {
        message: "release_created",
        data: response.data,
      };
    } catch (error) {
      console.error("Error creating release:", error);
      throw new BadRequestException("Error creating release");
    }
  }

  async createPullRequest(
    userId: number,
    createPullRequestInput: createPullRequestInput,
  ) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      "github",
      true,
    );
    const octokit = new Octokit({ auth: accessToken });
    const user = await this.getUser(userId, accessToken);

    const { data } = await octokit.rest.pulls.create({
      owner: user.login,
      repo: createPullRequestInput.github_repository,
      title: createPullRequestInput.github_pull_request_title,
      body: createPullRequestInput.github_pull_request_body,
      head: createPullRequestInput.github_pull_request_head,
      base: createPullRequestInput.github_pull_request_base,
    });
    return { message: "pull_request_created", data };
  }

  async createIssue(userId: number, createIssueInput: createIssueInput) {
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      "github",
      true,
    );
    const octokit = new Octokit({ auth: accessToken });
    const user = await this.getUser(userId, accessToken);

    const { data } = await octokit.rest.issues.create({
      owner: user.login,
      repo: createIssueInput.github_repository,
      title: createIssueInput.github_issue_title,
      body: createIssueInput.github_issue_body,
      labels: createIssueInput.github_issue_labels || [],
    });

    return {
      message: "issue_created",
      variables: {
        last_github_issue_title: createIssueInput.github_issue_title,
        last_github_issue_body: createIssueInput.github_issue_body,
        last_github_issue_labels: createIssueInput.github_issue_labels,
      },
    };
  }

  async getData(userId: number, variables: any) {
    let github_repository = "";
    if (variables && variables.github_repository) {
      github_repository = variables.github_repository;
    }
    const { accessToken } = await this.providerService.getCredentialsByProvider(
      userId,
      "github",
      true,
    );
    const octokit = new Octokit({ auth: accessToken });
    const user = await this.getUser(userId, accessToken);
    const repositories = await octokit.rest.repos.listForAuthenticatedUser();
    let branches = [];
    let targetCommitish = [];
    let issuesLabels = [];
    if (github_repository) {
      const responseBranches = await octokit.rest.repos.listBranches({
        owner: user.login,
        repo: github_repository,
      });
      branches = responseBranches.data.map((branch) => {
        return {
          name: branch.name,
          value: branch.name,
        };
      });
      const responseTargetCommitish = await octokit.rest.repos.listCommits({
        owner: user.login,
        repo: github_repository,
      });
      targetCommitish = responseTargetCommitish.data.map((commit) => {
        return {
          name: commit.url,
          value: commit.sha,
        };
      });
      const responseIssuesLabels = await octokit.rest.issues.listLabelsForRepo({
        owner: user.login,
        repo: github_repository,
      });
      issuesLabels = responseIssuesLabels.data.map((label) => {
        return {
          name: label.name,
          value: label.name,
        };
      });
    }
    return {
      github_repository: repositories.data.map((repo) => {
        return {
          name: repo.name,
          value: repo.name,
        };
      }),
      github_from_branch: branches,
      github_pull_request_head: branches,
      github_pull_request_base: branches,
      github_release_target_commitish: targetCommitish,
      github_issue_labels: issuesLabels,
    };
  }
}
