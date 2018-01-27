const _ = require('lodash');
const {getClient} = require('./client');

module.exports.getRepoBranches = async function({org, repo}) {
  const gh = getClient();

  const branchesResponse = await gh.repos.getBranches({
    owner: org,
    repo,
    per_page: 100
  });

  return _.map(branchesResponse.data, 'name');
};

module.exports.compareBranches = async function({org, repo}) {
  const gh = getClient();

  const {data} = await gh.repos.compareCommits({
    owner: org,
    repo,
    base: 'master',
    head: 'develop'
  });

  return data;
};

module.exports.getOrgRepos = async function(org) {
  const gh = getClient();

  const {data: repos} = await gh.repos.getForOrg({org, type: 'sources', per_page: 100});
  const reposNonArchived = _.reject(repos, {archived: true});

  return _.map(reposNonArchived, 'name');
};
