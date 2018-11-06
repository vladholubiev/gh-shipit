const inquirer = require('inquirer');
const chalk = require('chalk');
const {normalizeSpace} = require('normalize-space-x');
const opn = require('opn');
const {getLastRelease} = require('../client-releases');
const {getNextVersionOptions} = require('../semver');

module.exports.askNewReleaseVersion = async function({org, repo}) {
  const lastRelease = await getLastRelease({org, repo});
  const {version} = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: 'Version?',
      choices: getNextVersionOptions(lastRelease)
    }
  ]);

  return version;
};

module.exports.askReleaseTitle = async function({org, repo}) {
  const {inputType} = await inquirer.prompt([
    {
      type: 'list',
      name: 'inputType',
      message: 'Release Title?',
      choices: [
        {
          name: 'Enter now',
          value: 'enter-now'
        },
        {
          name: chalk`Enter after comparing branches {dim (opens github in browser)}`,
          value: 'enter-after'
        }
      ]
    }
  ]);

  if (inputType === 'enter-after') {
    const compareURL = `https://github.com/${org}/${repo}/compare/master...develop#commits_bucket`;
    opn(compareURL);
  }

  const {releaseTitle} = await inquirer.prompt([
    {
      type: 'input',
      name: 'releaseTitle',
      message: 'Release Title?',
      default: '...',
      filter(input) {
        return normalizeSpace(input);
      },
      validate(input = '') {
        input = normalizeSpace(input);

        if (input.length < 6) {
          return 'Please enter at least 6 letters';
        }

        return true;
      }
    }
  ]);

  return releaseTitle;
};

module.exports.askToOpenPR = async function({org, repo, pr}) {
  const {shouldOpenPR} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldOpenPR',
      message: 'Open PR in Browser?',
      default: true
    }
  ]);

  if (shouldOpenPR) {
    const prURL = `https://github.com/${org}/${repo}/pull/${pr}`;
    opn(prURL);
  }
};
