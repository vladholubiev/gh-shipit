const logSymbols = require('log-symbols');
const {askVersion, askReleaseTitle, askToOpenPR} = require('../inquirer');
const {createReleaseBranch, getLastDevelopCommitSHA} = require('../client-repos');
const {createReleasePR} = require('../client-prs');
const {createReleaseNotes} = require('../client-releases');

module.exports.prepareRelease = async function({org, repo}) {
  try {
    const version = await askVersion({org, repo});
    const commitHash = await getLastDevelopCommitSHA({org, repo});

    await createReleaseBranch({org, repo, version, commitHash});
    console.log(logSymbols.success, `Created branch release/v${version}!`);

    const releaseTitle = await askReleaseTitle({org, repo});

    await createReleaseNotes({org, repo, version, releaseTitle});
    console.log(logSymbols.success, `Created Release Notes!`);

    const {number} = await createReleasePR({org, repo, version, releaseTitle});
    console.log(logSymbols.success, `Created Pull Request #${number}!`);

    await askToOpenPR({org, repo, pr: number});
  } catch (error) {
    console.log(logSymbols.error, JSON.parse(error.message).message);
  }
};
