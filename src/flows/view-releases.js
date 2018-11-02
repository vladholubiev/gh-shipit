const CSVSerializer = require('json2csv').Parser;
const {getOrgReleases} = require('../client-releases');
const {getLatestReleases} = require('../helpers-releases');
const {printReleasesTable} = require('../releases-table');

const fields = [
  'repo',
  {label: 'date', value: row => row.date.toLocaleDateString()},
  'version',
  'name'
];

module.exports.viewReleases = async function({org, format}) {
  const releases = await getOrgReleases(org);
  const latestReleases = getLatestReleases(releases);

  if (format === 'table') {
    return printReleasesTable(latestReleases);
  }

  if (format === 'csv') {
    const serializer = new CSVSerializer({fields});
    console.log(serializer.parse(latestReleases));
  }
};
