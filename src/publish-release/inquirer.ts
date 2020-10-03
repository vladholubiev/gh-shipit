const ora = require('ora');
const inquirer = require('inquirer');
const logSymbols = require('log-symbols');
const {getOpenReleasePRForVersion} = require('./helpers');
const {getDraftReleaseTags, getOpenReleasePRs} = require('../client-releases');

module.exports.askDraftReleaseVersion = async function ({org, repo}) {
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
          value: release
        };
      })
    }
  ]);

  return {
    version: release.tag,
    releaseId: release.id
  };
};

module.exports.askDraftReleasePRNumber = async function ({org, repo, version}) {
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
      message: prTitle
    }
  ]);

  if (!confirm) {
    console.log(logSymbols.info, 'Release aborted. No changes have been made');

    return process.exit(0);
  }

  return prNumber;
};
