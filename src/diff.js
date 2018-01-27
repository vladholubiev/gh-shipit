const _ = require('lodash');
const {relativeTime} = require('human-date');
const longest = require('longest');
const {compareBranches, hasMasterAndDevelop} = require('./repos');

module.exports.getReposBranchesDiff = async function({org, repos}) {
  const diffs = await Promise.all(repos.map(repo => getBranchDiff({org, repo})));
  const diffsFormatted = _.flow(
    diffs => _.reject(diffs, {status: 'no-branch'}),
    diffs => _.orderBy(diffs, [d => new Date(d.lastCommitDate)], ['desc']),
    diffs => _.map(diffs, d => _.set(d, 'lastCommitDateFormatted', formatDate(d.lastCommitDate)))
  )(diffs);

  const datesFormatted = _.map(diffsFormatted, 'lastCommitDateFormatted');
  const widestDateLength = longest(datesFormatted).length;

  return _.map(diffsFormatted, d =>
    _.set(d, 'lastCommitDateFormatted', _.padStart(d.lastCommitDateFormatted, widestDateLength))
  );
};

function formatDate(date) {
  return relativeTime(new Date(date));
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
