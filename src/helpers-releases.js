const _ = require('lodash');
const semver = require('semver');
const {
  isSameWeek,
  isSameMonth,
  isSameQuarter,
  subWeeks,
  getISOWeek,
  getQuarter
} = require('date-fns');

// TODO Refactor with more lodash
module.exports.getLatestReleases = function(releases) {
  const allReleases = [];

  for (let repoRelease of releases) {
    for (let release of repoRelease.releases) {
      allReleases.push({
        repo: repoRelease.repo,
        date: release.publishedAt,
        name: release.name.replace(/Release.+:\s/, ''),
        version: semver.clean(release.version),
        week: getISOWeek(release.publishedAt),
        quarter: getQuarter(new Date())
      });
    }
  }

  const sortedReleases = _.orderBy(allReleases, ['date'], ['desc']);
  const buckets = {
    thisWeek: [],
    lastWeek: [],
    thisMonth: [],
    thisQuarter: []
  };

  for (let release of sortedReleases) {
    if (isSameWeek(release.date, new Date(), {weekStartsOn: 1})) {
      buckets.thisWeek.push(release);
      continue;
    }

    const lastWeekDate = subWeeks(new Date(), 1);

    if (isSameWeek(release.date, lastWeekDate, {weekStartsOn: 1})) {
      buckets.lastWeek.push(release);
      continue;
    }

    if (isSameMonth(release.date, new Date(), {weekStartsOn: 1})) {
      buckets.thisMonth.push(release);
      continue;
    }

    if (isSameQuarter(release.date, new Date(), {weekStartsOn: 1})) {
      buckets.thisQuarter.push(release);
      continue;
    }
  }

  return buckets;
};
