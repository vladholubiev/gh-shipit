const {getOrgReleases} = require('../client-releases');
const {getLatestReleases} = require('../helpers-releases');
const {printReleasesTableInRange} = require('../releases-table');

module.exports.viewReleases = async function(org) {
  const releases = await getOrgReleases(org);
  const latestReleases = getLatestReleases(releases);

  printReleasesTableInRange(latestReleases, 'thisWeek');
  printReleasesTableInRange(latestReleases, 'lastWeek');
  printReleasesTableInRange(latestReleases, 'thisMonth');
  printReleasesTableInRange(latestReleases, 'thisQuarter');
};
