const _ = require('lodash');
const fp = require('lodash/fp');
const {relativeTime} = require('human-date');
const longest = require('longest');
const {getBranchDiff} = require('./repos');

module.exports.getReposBranchesDiff = async function({org, repos}) {
  const diffs = await Promise.all(repos.map(repo => getBranchDiff({org, repo})));
  const diffsFormatted = fp.flow(
    fp.reject({status: 'no-branch'}),
    fp.orderBy([d => new Date(d.lastCommitDate)], ['desc']),
    fp.map(d => _.set(d, 'lastCommitDateFormatted', formatDate(d.lastCommitDate)))
  )(diffs);

  const widestDateLength = fp.flow(fp.map('lastCommitDateFormatted'), longest, fp.size)(
    diffsFormatted
  );

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
