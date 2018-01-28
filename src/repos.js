const _ = require('lodash');
const semver = require('semver');
const {getLastRelease} = require('./client-releases');
const {compareBranches} = require('./client-repos');

module.exports.getBranchDiff = async function({org, repo}) {
  try {
    const [{status, ahead_by, behind_by, commits, base_commit}, lastRelease] = await Promise.all([
      compareBranches({org, repo}),
      getLastRelease({org, repo})
    ]);

    const lastHeadCommitAuthor = _.get(commits.reverse(), '[0].commit.committer.name', '');

    const isRecentlyMergedMasterDevelopSync = lastHeadCommitAuthor === 'GitHub' && ahead_by === 1;
    if (isRecentlyMergedMasterDevelopSync) {
      return {org, repo, status: 'no-branch'};
    }

    const lastHeadCommitDate = _.get(commits.reverse(), '[0].commit.author.date', '');
    const lastBaseCommitDate = _.get(base_commit, 'commit.author.date', '');
    const lastCommitDate = lastHeadCommitDate || lastBaseCommitDate;

    return {
      org,
      repo,
      status,
      ahead_by,
      behind_by,
      lastCommitDate,
      lastRelease: semver.clean(lastRelease)
    };
  } catch (error) {
    return {org, repo, status: 'no-branch'};
  }
};
