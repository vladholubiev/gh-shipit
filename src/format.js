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
        name: chalk`${behind} ${ahead} ${repoFmt} ${release} ${date}`,
        value: repo
      };
    }
  );
};

function formatDiffs(diffs) {
  return fp.flow(sortDiffs, padByWidest)(diffs);
}

function sortDiffs(diffs) {
  return fp.flow(
    fp.reject({status: 'no-branch'}),
    fp.reject({ahead_by: 0, behind_by: 0}),
    fp.orderBy([d => new Date(d.lastCommitDate)], ['desc']),
    fp.map(d => _.set(d, 'lastCommitDateFormatted', formatDate(d.lastCommitDate)))
  )(diffs);
}

function padByWidest(diff) {
  const widestDateLength = fp.flow(fp.map('lastCommitDateFormatted'), longest, fp.size)(diff);
  const widestRepoLength = fp.flow(fp.map('repo'), longest, fp.size)(diff);

  return _.map(diff, d => {
    _.set(d, 'lastCommitDateFormatted', _.padStart(d.lastCommitDateFormatted, widestDateLength));
    _.set(d, 'repo', _.padEnd(d.repo, widestRepoLength));

    return d;
  });
}

function formatBehindBy(behindBy) {
  if (behindBy === 0) {
    return chalk`{red.dim ${_.padStart(`${behindBy}`, 4)}}`;
  }

  return chalk`{red ${_.padStart(`-${behindBy}`, 4)}}`;
}

function formatAheadBy(aheadBy) {
  if (aheadBy === 0) {
    return chalk`{green.dim ${_.padEnd(`${aheadBy}`, 4)}}`;
  }

  return chalk`{green ${_.padEnd(`+${aheadBy}`, 4)}}`;
}

function formatDate(date) {
  return relativeTime(new Date(date));
}
