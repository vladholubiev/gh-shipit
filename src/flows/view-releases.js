const {getOrgReleases} = require('../client-releases');
const {getLatestReleases} = require('../helpers-releases');
const {printReleasesTable} = require('../releases-table');

module.exports.viewReleases = async function({org, format}) {
  const releases = await getOrgReleases(org);
  const latestReleases = getLatestReleases(releases);

  if (format === 'table') {
    return printReleasesTable(latestReleases);
  }
};
