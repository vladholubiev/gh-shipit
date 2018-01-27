const _ = require('lodash');
const {relativeTime} = require('human-date');
const longest = require('longest');
const {getBranchDiff} = require('./repos');

module.exports.getReposBranchesDiff = async function({org, repos}) {
  const diffs = await Promise.all(repos.map(repo => getBranchDiff({org, repo})));
  const diffsFormatted = _.flow(
    diffs => _.reject(diffs, {status: 'no-branch'}),
    diffs => _.orderBy(diffs, [d => new Date(d.lastCommitDate)], ['desc']),
    diffs => _.map(diffs, d => _.set(d, 'lastCommitDateFormatted', formatDate(d.lastCommitDate)))
  )(diffs);

  const datesFormatted = _.map(diffsFormatted, 'lastCommitDateFormatted');
  const widestDateLength = longest(datesFormatted).length;

  return _.map(diffsFormatted, d => {
    _.set(d, 'lastCommitDateFormatted', _.padStart(d.lastCommitDateFormatted, widestDateLength));
    _.set(d, 'ahead_by', _.padEnd(`+${d.ahead_by}`, 4));
    _.set(d, 'behind_by', _.padStart(`-${d.behind_by}`, 4));

    return d;
  });
};

function formatDate(date) {
  return relativeTime(new Date(date));
}
