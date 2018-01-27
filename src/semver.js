const prettyVersionDiff = require('pretty-version-diff');
const semver = require('semver');
const chalk = require('chalk');

const increments = ['patch', 'minor', 'major'];

module.exports.getNextVersionOptions = function(currentVersion) {
  currentVersion = semver.clean(currentVersion);

  return increments.map(increment => ({
    name: `${increment}  ${chalk.dim('v')}${prettyVersionDiff(currentVersion, increment)}`,
    value: semver.inc(currentVersion, increment)
  }));
};
