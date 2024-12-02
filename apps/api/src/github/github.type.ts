export type createIssueInput = {
  github_issue_title: string;
  github_issue_body?: string;
  github_issue_labels?: string[];
  github_repository: string;
};

export type createBranchInput = {
  github_branch_name: string;
  github_from_branch: string;
  github_repository: string;
};

export type createReleaseInput = {
  github_release_title: string;
  github_release_body?: string;
  github_release_tag: string;
  github_release_target_commitish: string;
  github_release_draft?: boolean;
  github_repository: string;
};

export type createPullRequestInput = {
  github_pull_request_title: string;
  github_pull_request_body?: string;
  github_pull_request_head: string;
  github_pull_request_base: string;
  github_repository: string;
};
