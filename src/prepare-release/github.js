const _ = require('lodash');
const path = require('path');
const debug = require('debug')(`${require('../../package').name}:${path.basename(__filename)}`);
const {getClient} = require('../client');

module.exports.getLastDevelopCommitSHA = async function({org, repo}) {
  const gh = getClient();

  const {data} = await gh.repos.getBranch({
    owner: org,
    repo,
    branch: 'develop',
    per_page: 1
  });

  return _.get(data, 'commit.sha', '');
};

module.exports.createReleaseBranch = async function({org, repo, version, commitHash}) {
  const gh = getClient();
  const branchName = `refs/heads/release/v${version}`;

  const {data} = await gh.gitdata.createRef({
    owner: org,
    repo,
    ref: branchName,
    sha: commitHash
  });

  return data;
};

module.exports.createReleaseNotes = async function({org, repo, version, releaseTitle}) {
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
};

module.exports.createReleasePR = async function({org, repo, version, releaseTitle}) {
  const gh = getClient();
  const tagName = `v${version}`;
  const branch = `release/${tagName}`;

  debug('Creating release PR', {org, repo, branch, version});

  const {data} = await gh.pullRequests.create({
    owner: org,
    repo,
    head: branch,
    base: 'master',
    title: `Release ${tagName}: ${releaseTitle}`
  });

  return data;
};
