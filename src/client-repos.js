const _ = require('lodash');
const fp = require('lodash/fp');
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
  const withoutArchived = fp.reject({archived: true});
  const getName = fp.map('name');

  return fp.flow(withoutArchived, getName)(repos);
};
