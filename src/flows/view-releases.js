const {getOrgReleases} = require('../client-releases');
const {getLatestReleases} = require('../helpers-releases');
const {printReleasesTable} = require('../releases-table');

module.exports.viewReleases = async function(org) {
  const releases = await getOrgReleases(org);
  const latestReleases = getLatestReleases(releases);

  printReleasesTable(latestReleases);
};
