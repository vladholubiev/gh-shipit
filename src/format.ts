import chalk from 'chalk';
import _ from 'lodash';
import fp from 'lodash/fp';
import {relativeTime} from 'human-date';
import longest from 'longest';

export function formatReposDiffsForChoices(diffs) {
  return filterAndSortDiffs(diffs).map(diff => formatRepoDiff(diffs, diff));
}

function formatRepoDiff(diffs, diff) {
  const {
    behind_by,
    ahead_by,
    lastCommitDateFormatted,
    repo,
    lastRelease,
    lastDraftReleaseTag
  } = diff;
  const widestDateLength = getWidestProperty(diffs, 'lastCommitDateFormatted');
  const widestRepoLength = getWidestProperty(diffs, 'repo');

  const behind = formatBehindBy(behind_by);
  const ahead = formatAheadBy(ahead_by);
  const repoFmt = chalk`{bold ${_.padEnd(repo, widestRepoLength)}}`;
  const release = chalk`{dim ${_.padEnd(lastRelease, 8)}}`;
  const releaseDraft = chalk`{dim ${_.padEnd(lastDraftReleaseTag, 8)}}`;
  const date = chalk`{dim ${_.padEnd(lastCommitDateFormatted, widestDateLength)}}`;

  return {
    name: chalk`${behind} ${ahead} ${repoFmt} ${release} ${releaseDraft} ${date}`,
    value: repo
  };
}

function filterAndSortDiffs(diffs) {
  return fp.flow(
    fp.reject({status: 'no-branch'}),
    fp.reject({ahead_by: 0, behind_by: 0}),
    fp.orderBy([d => new Date(d.lastCommitDate)], ['asc']),
    fp.map(d => _.set(d, 'lastCommitDateFormatted', formatDate(d.lastCommitDate)))
  )(diffs);
}

function getWidestProperty(diffs, property) {
  return fp.flow(fp.map(property), fp.compact, longest, fp.size)(diffs);
}

function formatBehindBy(behindBy) {
  if (behindBy === 0) {
    return chalk`{red.dim ${_.padStart(`${behindBy}`, 4)}}`;
  }

  return chalk`{red ${_.padStart(`-${behindBy}`, 4)}}`;
}

function formatAheadBy(aheadBy) {
  if (aheadBy === 0) {
    return chalk`{green.dim ${_.padEnd(`${aheadBy}`, 5)}}`;
  }

  return chalk`{green ${_.padEnd(`+${aheadBy}`, 5)}}`;
}

function formatDate(date) {
  return relativeTime(new Date(date));
}
