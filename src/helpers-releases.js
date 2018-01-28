const _ = require('lodash');

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

  return _.orderBy(allReleases, ['date'], ['desc']);
};
