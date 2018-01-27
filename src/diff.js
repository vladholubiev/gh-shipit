const _ = require('lodash');
const {distanceInWordsToNow} = require('date-fns');
const {compareBranches, hasMasterAndDevelop} = require('./repos');

module.exports.getReposBranchesDiff = async function({org, repos}) {
  const diffs = await Promise.all(repos.map(repo => getBranchDiff({org, repo})));
  const diffsWithBranches = _.reject(diffs, {status: 'no-branch'});
  const diffsSorted = _.orderBy(diffsWithBranches, [d => new Date(d.lastCommitDate)], ['desc']);
  const diffsWithFormattedDate = _.map(diffsSorted, d => ({
    ...d,
    lastCommitDateFormatted: formatDate(d.lastCommitDate)
  }));

  return diffsWithFormattedDate;
};

function formatDate(date) {
  return distanceInWordsToNow(new Date(date), {addSuffix: true});
}

async function getBranchDiff({org, repo}) {
  if (!await hasMasterAndDevelop({org, repo})) {
    return {org, repo, status: 'no-branch'};
  }

  const {status, ahead_by, behind_by, commits, base_commit} = await compareBranches({org, repo});

  const lastHeadCommitDate = _.get(commits.reverse(), '[0].commit.author.date', '');
  const lastBaseCommitDate = _.get(base_commit, 'commit.author.date', '');
  const lastCommitDate = lastHeadCommitDate || lastBaseCommitDate;

  return {org, repo, status, ahead_by, behind_by, lastCommitDate};
}
