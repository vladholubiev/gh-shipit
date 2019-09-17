const _ = require('lodash');
const semver = require('semver');
const {getISOWeek, getQuarter} = require('date-fns');

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

  for (const repoRelease of releases) {
    for (const release of repoRelease.releases) {
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

  return _.orderBy(allReleases, ['date'], ['desc']);
};
