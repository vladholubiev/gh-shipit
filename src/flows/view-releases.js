const _ = require('lodash');
const chalk = require('chalk');
const Table = require('cli-table2');
const logSymbols = require('log-symbols');
const smartwrap = require('smartwrap');
const babar = require('babar');
const {getQuarter} = require('date-fns');
const getCliWidth = require('cli-width');
const stringWidth = require('string-width');
const boxen = require('boxen');
const {getOrgReleases} = require('../client-releases');
const {getLatestReleases} = require('../helpers-releases');

module.exports.viewReleases = async function(org) {
  const releases = await getOrgReleases(org);
  const latestReleases = getLatestReleases(releases);

  printHistogram(latestReleases);
  printRange(latestReleases, 'thisWeek');
  printRange(latestReleases, 'lastWeek');
  printRange(latestReleases, 'thisMonth');
  printRange(latestReleases, 'thisQuarter');
};

function printHistogram(latestReleases) {
  const releasesByWeek = _.countBy(
    [
      ...latestReleases.thisWeek,
      ...latestReleases.lastWeek,
      ...latestReleases.thisMonth,
      ...latestReleases.thisQuarter
    ],
    'week'
  );

  const releasesByWeekStats = [];

  _.times(13, week => {
    week += 1;
    releasesByWeekStats.push([week * getQuarter(new Date()), releasesByWeek[String(week)] || 0]);
  });

  printSectionHeading('Releases Per Week In Current Quarter');
  console.log(babar(releasesByWeekStats, {width: getCliWidth()}));
  console.log();
}

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
      smartwrap(row.repo, {width: Math.floor(getCliWidth() / 4)}),
      row.date.toLocaleDateString(),
      row.version,
      smartwrap(row.name, {width: Math.floor(getCliWidth() / 2)})
    ]);
  });

  const tableString = table.toString();
  const tableWidth = stringWidth(tableString.split('\n')[0]) - 8;

  printSectionHeading(_.startCase(rangeKey), tableWidth);

  console.log(tableString);
  console.log();
}
