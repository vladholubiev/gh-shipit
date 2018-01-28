const _ = require('lodash');
const {isSameWeek, isSameMonth, isSameQuarter} = require('date-fns');

// TODO Refactor with more lodash
module.exports.getLatestReleases = function(releases) {
  const allReleases = [];

  for (let repoRelease of releases) {
    for (let release of repoRelease.releases) {
      allReleases.push({
        repo: repoRelease.repo,
        date: release.publishedAt,
        name: release.name,
        version: release.version
      });
    }
  }

  const sortedReleases = _.orderBy(allReleases, ['date'], ['desc']);
  const buckets = {
    thisWeek: [],
    thisMonth: [],
    thisQuarter: []
  };

  for (let release of sortedReleases) {
    if (isSameWeek(release.date, new Date())) {
      buckets.thisWeek.push(release);
    }

    if (isSameMonth(release.date, new Date())) {
      buckets.thisMonth.push(release);
    }

    if (isSameQuarter(release.date, new Date())) {
      buckets.thisQuarter.push(release);
    }
  }

  return buckets;
};
