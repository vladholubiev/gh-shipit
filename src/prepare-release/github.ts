import {getClient} from '@shelf/gh-sdk/lib/rest-client';
import {GitCreateRefResponse, PullsCreateResponse} from '@octokit/rest';
import {
  createReleaseBranch as createBranchRelease,
  createReleasePR as createReleasePullRequest,
  getLatestDevelopCommitSHA as getLatestDevCommitSHA,
} from '@shelf/gh-sdk';

export async function getLastDevelopCommitSHA({
  org,
  repo,
}: {
  org: string;
  repo: string;
}): Promise<string> {
  return getLatestDevCommitSHA({
    owner: org,
    repo,
  });
}

export async function createReleaseBranch({
  org,
  repo,
  version,
  commitHash,
}): Promise<GitCreateRefResponse> {
  return createBranchRelease({
    owner: org,
    sha: commitHash,
    repo,
    version,
  });
}

export async function createReleaseNotes({org, repo, version, releaseTitle}) {
  const gh = getClient();
  const tagName = `v${version}`;

  const {data} = await gh.repos.createRelease({
    owner: org,
    repo,
    tag_name: tagName,
    target_commitish: `release/${tagName}`,
    name: `Release ${tagName}: ${releaseTitle}`,
    draft: true,
  });

  return data;
}

export async function createReleasePR({
  org,
  repo,
  version,
  releaseTitle,
}): Promise<PullsCreateResponse> {
  return createReleasePullRequest({
    owner: org,
    repo,
    version,
    releaseTitle,
  });
}
