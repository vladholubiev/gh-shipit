const _ = require('lodash');
const babar = require('babar');
const {getQuarter} = require('date-fns');
const getCliWidth = require('cli-width');
const boxen = require('boxen');
const {getOrgReleases} = require('../client-releases');
const {getLatestReleases} = require('../helpers-releases');
const {printReleasesTableInRange} = require('../releases-table');

module.exports.viewReleases = async function(org) {
  const releases = await getOrgReleases(org);
  const latestReleases = getLatestReleases(releases);

  printHistogram(latestReleases);
  printReleasesTableInRange(latestReleases, 'thisWeek');
  printReleasesTableInRange(latestReleases, 'lastWeek');
  printReleasesTableInRange(latestReleases, 'thisMonth');
  printReleasesTableInRange(latestReleases, 'thisQuarter');
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
