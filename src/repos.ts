/* eslint-disable camelcase */
import _ from 'lodash';
import semver from 'semver';
import path from 'path';
import debug0 from 'debug';
import {name} from '../package.json';
import {getLastDraftReleaseTag, getLastRelease} from './client-releases';
import {compareBranches} from './client-repos';

const debug = debug0(`${name}:${path.basename(__filename)}`);

export async function getBranchDiff({org, repo}) {
  try {
    const [{status, ahead_by, behind_by, commits, base_commit}, lastRelease, lastDraftReleaseTag] =
      await Promise.all([
        compareBranches({org, repo}),
        getLastRelease({org, repo}),
        getLastDraftReleaseTag({org, repo}),
      ]);

    const lastHeadCommitDate = _.get(commits.reverse(), '[0].commit.author.date', '');
    const lastBaseCommitDate = _.get(base_commit, 'commit.author.date', '');
    const lastCommitDate = lastHeadCommitDate || lastBaseCommitDate;

    const repoDiff = {
      org,
      repo,
      status,
      ahead_by,
      behind_by,
      lastCommitDate,
      lastRelease: semver.clean(lastRelease),
      lastDraftReleaseTag: lastDraftReleaseTag || '-',
    };

    debug('%o', repoDiff);

    return repoDiff;
  } catch (error) {
    if (error.status === 404) {
      debug('repo %s, no master or develop branch', repo);
    }

    return {org, repo, status: 'no-branch'};
  }
}
