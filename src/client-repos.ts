import _ from 'lodash';
import path from 'path';
import debug0 from 'debug';
import {listOrgRepos} from '@shelf/gh-sdk';
import {getClient} from '@shelf/gh-sdk/lib/rest-client';

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

export async function getOrgRepoNames(org): Promise<string[]> {
  const orgRepos = await listOrgRepos(org);

  return _.map(
    orgRepos.filter(repo => !repo.archived),
    'name'
  );
}
