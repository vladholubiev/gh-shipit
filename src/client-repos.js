const _ = require('lodash');
const fp = require('lodash/fp');
const path = require('path');
const debug = require('debug')(`${require('../package').name}:${path.basename(__filename)}`);
const {getClient} = require('./client');

module.exports.getRepoBranches = async function({org, repo}) {
  const gh = getClient();

  const branchesResponse = await gh.repos.getBranches({
    owner: org,
    repo,
    per_page: 100
  });

  const branches = _.map(branchesResponse.data, 'name');
  debug('Loaded branches. Repo: %s, Branches: %o', repo, branches);

  return branches;
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

  const orgRepos = fp.flow(
    withoutArchived,
    getName
  )(repos);
  debug('Loaded repos %o', orgRepos);

  return orgRepos;
};
