const _ = require('lodash');
const {getLastRelease} = require('./client-releases');
const {compareBranches} = require('./client-repos');
const {hasMasterAndDevelop} = require('./helpers-repos');

module.exports.getBranchDiff = async function({org, repo}) {
  if (!await hasMasterAndDevelop({org, repo})) {
    return {org, repo, status: 'no-branch'};
  }

  const {status, ahead_by, behind_by, commits, base_commit} = await compareBranches({org, repo});
  const lastRelease = await getLastRelease({org, repo});

  const lastHeadCommitDate = _.get(commits.reverse(), '[0].commit.author.date', '');
  const lastBaseCommitDate = _.get(base_commit, 'commit.author.date', '');
  const lastCommitDate = lastHeadCommitDate || lastBaseCommitDate;

  return {org, repo, status, ahead_by, behind_by, lastCommitDate, lastRelease};
};
