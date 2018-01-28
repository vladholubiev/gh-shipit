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
module.exports.getLatestReleases = function(edges) {
  const releases = _.map(edges, edge => {
    return {
      repo: _.get(edge, 'node.name', ''),
      releases: _.map(_.get(edge, 'node.releases.edges', []), e => ({
        publishedAt: new Date(_.get(e, 'node.publishedAt', new Date(1970, 1, 1))),
        name: _.get(e, 'node.name', ''),
        version: _.get(e, 'node.tag.name', ' ').slice(1)
      }))
    };
  });

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
