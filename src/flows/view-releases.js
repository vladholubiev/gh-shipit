const _ = require('lodash');
const chalk = require('chalk');
const Table = require('cli-table2');
const logSymbols = require('log-symbols');
const smartwrap = require('smartwrap');
const {getOrgReleases} = require('../client-releases');
const {getLatestReleases} = require('../helpers-releases');

module.exports.viewReleases = async function(org) {
  const releases = await getOrgReleases(org);
  const latestReleases = getLatestReleases(releases);

  printRange(latestReleases, 'thisWeek');
  printRange(latestReleases, 'lastWeek');
  printRange(latestReleases, 'thisMonth');
  printRange(latestReleases, 'thisQuarter');
};

function printRange(latestReleases, rangeKey) {
  const rows = latestReleases[rangeKey];

  if (_.isEmpty(rows)) {
    return;
  }

  const table = new Table({
    head: ['repo', 'date', 'version', 'name']
  });

  rows.forEach(row => {
    table.push([
      smartwrap(row.repo, {width: 30}),
      row.date.toLocaleDateString(),
      row.version,
      smartwrap(row.name, {width: 54})
    ]);
  });

  console.log(chalk` {bold ${logSymbols.info}} {cyan ${_.startCase(rangeKey)}}`);
  console.log(table.toString());
}
