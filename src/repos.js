const _ = require('lodash');
const semver = require('semver');
const path = require('path');
const debug = require('debug')(`${require('../package').name}:${path.basename(__filename)}`);
const {getLastRelease} = require('./client-releases');
const {compareBranches} = require('./client-repos');

module.exports.getBranchDiff = async function({org, repo}) {
  try {
    const [{status, ahead_by, behind_by, commits, base_commit}, lastRelease] = await Promise.all([
      compareBranches({org, repo}),
      getLastRelease({org, repo})
    ]);

    const lastHeadCommitAuthor = _.get(commits.reverse(), '[0].commit.committer.name', '');
    const lastBaseCommitAuthor = _.get(base_commit, 'commit.committer.name', '');
    const isLastCommitByGithubMerge =
      lastHeadCommitAuthor === 'GitHub' || lastBaseCommitAuthor === 'GitHub';
    const isOnly1CommitDiff = ahead_by === 1 || behind_by === 1;

    const isRecentlyMergedByGitHub = isLastCommitByGithubMerge && isOnly1CommitDiff;
    debug('%o', {repo, isRecentlyMergedMasterDevelopSync: isRecentlyMergedByGitHub});

    if (isRecentlyMergedByGitHub) {
      return {org, repo, status: 'no-branch'};
    }

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
      lastRelease: semver.clean(lastRelease)
    };

    debug('%o', repoDiff);

    return repoDiff;
  } catch (error) {
    if (error.code === 404) {
      debug('repo %s, no master or develop branch', repo);
    }

    return {org, repo, status: 'no-branch'};
  }
};
