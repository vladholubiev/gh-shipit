const chalk = require('chalk');
const _ = require('lodash');
const fp = require('lodash/fp');
const {relativeTime} = require('human-date');
const longest = require('longest');

module.exports.formatReposDiffsForChoices = function(diffs) {
  return formatDiffs(diffs).map(
    ({status, behind_by, ahead_by, lastCommitDateFormatted, repo, lastRelease}) => {
      const date = chalk`{dim ${lastCommitDateFormatted}}`;
      const behind = formatBehindBy(behind_by);
      const ahead = formatAheadBy(ahead_by);
      const release = chalk`{dim ${_.padEnd(lastRelease, 8)}}`;
      const repoFmt = chalk`{bold ${repo}}`;

      return {
        name: chalk`${date} ${behind} ${ahead} ${release} ${repoFmt}`,
        value: repo
      };
    }
  );
};

function formatDiffs(diffs) {
  return fp.flow(sortDiffs, padByWidestDate)(diffs);
}

function sortDiffs(diffs) {
  return fp.flow(
    fp.reject({status: 'no-branch'}),
    fp.orderBy([d => new Date(d.lastCommitDate)], ['desc']),
    fp.map(d => _.set(d, 'lastCommitDateFormatted', formatDate(d.lastCommitDate)))
  )(diffs);
}

function padByWidestDate(diff) {
  const widestDateLength = fp.flow(fp.map('lastCommitDateFormatted'), longest, fp.size)(diff);

  return _.map(diff, d => {
    _.set(d, 'lastCommitDateFormatted', _.padEnd(d.lastCommitDateFormatted, widestDateLength));

    return d;
  });
}

function formatBehindBy(behindBy) {
  const padded = _.padStart(`-${behindBy}`, 4);

  if (behindBy === 0) {
    return chalk`{red.dim ${padded}}`;
  }

  return chalk`{red ${padded}}`;
}

function formatAheadBy(aheadBy) {
  const padded = _.padEnd(`+${aheadBy}`, 4);

  if (aheadBy === 0) {
    return chalk`{green.dim ${padded}}`;
  }

  return chalk`{green ${padded}}`;
}

function formatDate(date) {
  return relativeTime(new Date(date));
}
