const prettyVersionDiff = require('pretty-version-diff');
const semver = require('semver');

const increments = ['patch', 'minor', 'major'];

module.exports.getNextVersionOptions = function(currentVersion) {
  return increments.map(increment => ({
    name: `${increment}  ${prettyVersionDiff(currentVersion, increment)}`,
    value: semver.inc(currentVersion, increment)
  }));
};
