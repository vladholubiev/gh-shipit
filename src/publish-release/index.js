const logSymbols = require('log-symbols');
const {publishDraftRelease, mergePR, deleteBranch} = require('./github');
const {askDraftReleaseVersion, askDraftReleasePRNumber} = require('./inquirer');

module.exports.publishRelease = async function({org, repo}) {
  try {
    const {version, releaseId} = await askDraftReleaseVersion({org, repo});
    const prNumber = await askDraftReleasePRNumber({org, repo, version});

    console.log(
      logSymbols.info,
      `You are about to publish release ${version} and merge PR to master`
    );

    await publishDraftRelease({org, repo, releaseId});
    console.log(logSymbols.success, `Release ${version} published`);

    await mergePR({org, repo, number: prNumber});
    console.log(logSymbols.success, `Pull request merged to master`);

    await deleteBranch({org, repo, name: `release/${version}`});
    console.log(logSymbols.success, `Deleted release branch`);
  } catch (error) {
    console.log(logSymbols.error, JSON.parse(error.message).message);
  }
};
