const _ = require('lodash');
const {getClient} = require('./client');

async function getUserOrgs() {
  const gh = getClient();
  const orgs = await gh.users.getOrgs();
  const orgNames = _.map(orgs.data, 'login');

  return orgNames.sort();
}

async function getOrgRepos(org) {
  const gh = getClient();
  const repos = await gh.repos.getForOrg({org, type: 'sources', per_page: 100});

  return _.map(repos.data, 'name');
}

async function getBranchDiff({org, repo}) {
  if (!await hasMasterAndDevelop({org, repo})) {
    return {org, repo, status: 'no-branch'};
  }

  const {status, ahead_by, behind_by, commits, base_commit} = await compareBranches({org, repo});

  const lastHeadCommitDate = _.get(commits.reverse(), '[0].commit.author.date', '');
  const lastBaseCommitDate = _.get(base_commit, 'commit.author.date', '');
  const lastCommitDate = lastHeadCommitDate || lastBaseCommitDate;

  return {org, repo, status, ahead_by, behind_by, lastCommitDate};
}

async function hasMasterAndDevelop({org, repo}) {
  const branches = await getRepoBranches({org, repo});
  return branches.includes('develop') && branches.includes('master');
}

async function getRepoBranches({org, repo}) {
  const gh = getClient();

  const branchesResponse = await gh.repos.getBranches({
    owner: org,
    repo,
    per_page: 100
  });

  return _.map(branchesResponse.data, 'name');
}

async function compareBranches({org, repo}) {
  const gh = getClient();

  const {data} = await gh.repos.compareCommits({
    owner: org,
    repo,
    base: 'master',
    head: 'develop'
  });

  return data;
}

module.exports = {
  getUserOrgs,
  getOrgRepos,
  getBranchDiff
};
