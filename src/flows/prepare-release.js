const logSymbols = require('log-symbols');
const {askNewReleaseVersion, askReleaseTitle, askToOpenPR} = require('../inquirer');
const {createReleaseBranch, getLastDevelopCommitSHA} = require('../client-repos');
const {createReleasePR} = require('../client-prs');
const {createReleaseNotes} = require('../client-releases');
const {createReleaseLabel, assignReleaseLabel} = require('../client-labels');
const {hasReleaseLabel} = require('../helpers-labels');

module.exports.prepareRelease = async function({org, repo}) {
  try {
    const version = await askNewReleaseVersion({org, repo});
    const commitHash = await getLastDevelopCommitSHA({org, repo});

    await createReleaseBranch({org, repo, version, commitHash});
    console.log(logSymbols.success, `Created branch release/v${version}!`);

    const releaseTitle = await askReleaseTitle({org, repo});

    await createReleaseNotes({org, repo, version, releaseTitle});
    console.log(logSymbols.success, `Created Release Notes!`);

    const {number} = await createReleasePR({org, repo, version, releaseTitle});
    console.log(logSymbols.success, `Created Pull Request #${number}!`);

    if (!(await hasReleaseLabel({org, repo}))) {
      console.log(logSymbols.warning, `No Release Label Found`);

      await createReleaseLabel({org, repo});
      console.log(logSymbols.success, `Created Release Label!`);
    }

    await assignReleaseLabel({org, repo, pr: number});
    console.log(logSymbols.success, `Assigned Release Label to PR #${number}!`);

    await askToOpenPR({org, repo, pr: number});
  } catch (error) {
    console.log(logSymbols.error, JSON.parse(error.message).message);
  }
};
