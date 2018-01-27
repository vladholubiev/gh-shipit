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
  console.log(repos);
}

async function getBranchDiff({org, repo}) {
  const gh = getClient();
  const resp = await gh.repos.compareCommits({
    owner: org,
    repo,
    base: 'master',
    head: 'develop'
  });

  const {status, ahead_by, behind_by, commits, base_commit} = resp.data;

  const lastHeadCommitDate = _.get(commits.reverse(), '[0].commit.author.date', '');
  const lastBaseCommitDate = _.get(base_commit, 'commit.author.date', '');
  const lastCommitDate = lastHeadCommitDate || lastBaseCommitDate;

  return {status, ahead_by, behind_by, lastCommitDate};
}

module.exports = {
  getUserOrgs,
  getOrgRepos,
  getBranchDiff
};
