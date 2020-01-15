import _ from 'lodash';
import fp from 'lodash/fp';
import path from 'path';
import debug0 from 'debug';
import {getClient} from './client';

const debug = debug0(`${require('../package').name}:${path.basename(__filename)}`);

export async function getRepoBranches({org, repo}) {
  const gh = getClient();

  const branchesResponse = await gh.repos.getBranches({
    owner: org,
    repo,
    per_page: 100
  });

  const branches = _.map(branchesResponse.data, 'name');
  debug('Loaded branches. Repo: %s, Branches: %o', repo, branches);

  return branches;
}

export async function compareBranches({org, repo}) {
  const gh = getClient();

  const {data} = await gh.repos.compareCommits({
    owner: org,
    repo,
    base: 'master',
    head: 'develop'
  });

  return data;
}

export async function getOrgRepoNames(org) {
  const orgRepos = await getOrgRepos(org);

  return _.map(orgRepos, 'name');
}

export async function getOrgRepos(org: string) {
  const gh = getClient();
  const [{data: repos1}, {data: repos2}] = await Promise.all([
    gh.repos.listForOrg({
      org,
      type: 'sources',
      sort: 'pushed',
      per_page: 100,
      page: 1,
      direction: 'desc'
    }),
    gh.repos.listForOrg({
      org,
      type: 'sources',
      sort: 'pushed',
      per_page: 100,
      page: 2,
      direction: 'desc'
    })
  ]);
  const repos = [...repos1, ...repos2];

  return _.uniqBy(
    repos.filter(repo => !repo.archived),
    'name'
  );
}
