import ora from 'ora';
import inquirer from 'inquirer';
import logSymbols from 'log-symbols';
import {getOpenReleasePRForVersion} from './helpers';
import {getDraftReleaseTags, getOpenReleasePRs} from '../client-releases';

export async function askDraftReleaseVersion({org, repo}) {
  const tagsSpinner = ora('Fetching draft releases');
  const draftReleaseTags = await getDraftReleaseTags({org, repo});
  tagsSpinner.stop();

  const {release} = await inquirer.prompt([
    {
      type: 'list',
      name: 'release',
      message: 'Version?',
      choices: draftReleaseTags.map(release => {
        return {
          name: release.tag,
          value: release,
        };
      }),
    },
  ]);

  return {
    version: release.tag,
    releaseId: release.id,
  };
}

export async function askDraftReleasePRNumber({org, repo, version}) {
  const prsSpinner = ora('Fetching open PRs');
  const prs = await getOpenReleasePRs({org, repo});
  prsSpinner.stop();

  const {isReadyToMerge, prTitle, prNumber, reason} = getOpenReleasePRForVersion(prs, version);

  if (!isReadyToMerge) {
    console.log(logSymbols.error, reason);

    return process.exit(0);
  }

  const {confirm} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: prTitle,
    },
  ]);

  if (!confirm) {
    console.log(logSymbols.info, 'Release aborted. No changes have been made');

    return process.exit(0);
  }

  return prNumber;
}
