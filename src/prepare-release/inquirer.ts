import inquirer from 'inquirer';
import chalk from 'chalk';
import {normalizeSpace} from 'normalize-space-x';
import opn from 'opn';
import {getLastRelease} from '../client-releases';
import {getNextVersionOptions} from '../semver';

export async function askNewReleaseVersion({org, repo}) {
  const lastRelease = await getLastRelease({org, repo});
  const {version} = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: 'Version?',
      choices: getNextVersionOptions(lastRelease),
    },
  ]);

  return version;
}

export async function askReleaseTitle({org, repo}) {
  const {inputType} = await inquirer.prompt([
    {
      type: 'list',
      name: 'inputType',
      message: 'Release Title?',
      choices: [
        {
          name: 'Enter now',
          value: 'enter-now',
        },
        {
          name: chalk`Enter after comparing branches {dim (opens github in browser)}`,
          value: 'enter-after',
        },
      ],
    },
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
      },
    },
  ]);

  return releaseTitle;
}

export async function askToOpenPR({org, repo, pr}) {
  const {shouldOpenPR} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldOpenPR',
      message: 'Open PR in Browser?',
      default: true,
    },
  ]);

  if (shouldOpenPR) {
    const prURL = `https://github.com/${org}/${repo}/pull/${pr}`;
    opn(prURL);
  }
}
