import _ from 'lodash';
import {getClient} from '@shelf/gh-sdk/lib/rest-client';

export async function getLastDevelopCommitSHA({org, repo}) {
  const gh = getClient();

  const {data} = await gh.repos.getBranch({
    owner: org,
    repo,
    branch: 'develop',
    per_page: 1
  });

  return _.get(data, 'commit.sha', '');
}

export async function createReleaseBranch({org, repo, version, commitHash}) {
  const gh = getClient();
  const branchName = `refs/heads/release/v${version}`;

  const {data} = await gh.gitdata.createRef({
    owner: org,
    repo,
    ref: branchName,
    sha: commitHash
  });

  return data;
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
    draft: true
  });

  return data;
}

export async function createReleasePR({org, repo, version, releaseTitle}) {
  const gh = getClient();
  const tagName = `v${version}`;
  const branch = `release/${tagName}`;

  const {data} = await gh.pullRequests.create({
    owner: org,
    repo,
    head: branch,
    base: 'master',
    title: `Release ${tagName}: ${releaseTitle}`
  });

  return data;
}
