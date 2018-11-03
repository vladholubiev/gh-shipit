const _ = require('lodash');
const Table = require('cli-table3');
const smartwrap = require('smartwrap');
const getCliWidth = require('cli-width');
const stringWidth = require('string-width');
const boxen = require('boxen');

module.exports.printReleasesTable = function(latestReleases) {
  const rows = latestReleases;

  if (_.isEmpty(rows)) {
    return;
  }

  const table = new Table({
    head: ['repo', 'date', 'version', 'name']
  });

  rows.forEach(row => {
    table.push([
      smartwrap(row.repo, {width: Math.floor(getCliWidth() / 4)}),
      row.date.toLocaleDateString(),
      row.version,
      smartwrap(row.name, {width: Math.floor(getCliWidth() / 2)})
    ]);
  });

  const tableString = table.toString();
  const tableWidth = stringWidth(tableString.split('\n')[0]) - 8;

  printSectionHeading('Last 100 releases', tableWidth);

  console.log(tableString);
  console.log();
};

function printSectionHeading(title, width = getCliWidth() - 16) {
  console.log(
    boxen(_.pad(title, width), {
      borderColor: 'magenta',
      padding: 1,
      margin: {bottom: 1},
      float: 'left',
      align: 'center'
    })
  );
}
