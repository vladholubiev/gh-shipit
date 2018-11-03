const CSVSerializer = require('json2csv').Parser;
const {getOrgReleases} = require('./github');
const {getLatestReleases} = require('./format');
const {printReleasesTable} = require('./print');

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
