import prettyVersionDiff from 'pretty-version-diff';
import semver from 'semver';
import chalk from 'chalk';

const increments = ['patch', 'minor', 'major'];

export function getNextVersionOptions(currentVersion) {
  currentVersion = semver.clean(currentVersion);

  return increments.map(increment => ({
    name: `${increment}  ${chalk.dim('v')}${prettyVersionDiff(currentVersion, increment)}`,
    value: semver.inc(currentVersion, increment as any),
  }));
}
