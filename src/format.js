const chalk = require('chalk');
const _ = require('lodash');
const fp = require('lodash/fp');
const {relativeTime} = require('human-date');
const longest = require('longest');

module.exports.formatReposDiffsForChoices = function(diffs) {
  return formatDiffs(diffs).map(
    ({status, behind_by, ahead_by, lastCommitDateFormatted, repo, lastRelease}) => {
      return {
        name: chalk`{dim ${lastCommitDateFormatted}} {red ${behind_by}} {green ${ahead_by}} {dim ${_.padEnd(
          lastRelease,
          8
        )}} {bold ${repo}}`,
        value: repo
      };
    }
  );
};

function formatDiffs(diffs) {
  return fp.flow(sortDiffs, padDiffs)(diffs);
}

function sortDiffs(diffs) {
  return fp.flow(
    fp.reject({status: 'no-branch'}),
    fp.orderBy([d => new Date(d.lastCommitDate)], ['desc']),
    fp.map(d => _.set(d, 'lastCommitDateFormatted', formatDate(d.lastCommitDate)))
  )(diffs);
}

function padDiffs(diff) {
  const widestDateLength = fp.flow(fp.map('lastCommitDateFormatted'), longest, fp.size)(diff);

  return _.map(diff, d => {
    _.set(d, 'lastCommitDateFormatted', _.padStart(d.lastCommitDateFormatted, widestDateLength));
    _.set(d, 'ahead_by', _.padEnd(`+${d.ahead_by}`, 4));
    _.set(d, 'behind_by', _.padStart(`-${d.behind_by}`, 4));

    return d;
  });
}

function formatDate(date) {
  return relativeTime(new Date(date));
}
