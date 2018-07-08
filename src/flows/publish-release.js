const logSymbols = require('log-symbols');
const {askDraftReleaseVersion, askDraftReleasePRNumber} = require('../inquirer');

module.exports.publishRelease = async function({org, repo}) {
  try {
    const {version, releaseId} = await askDraftReleaseVersion({org, repo});
    console.log(version);
    console.log(releaseId);

    const prNumber = await askDraftReleasePRNumber({org, repo, version});
    console.log(prNumber);

    console.log(
      logSymbols.info,
      `You are about to publish release ${version} and merge PR to master`
    );
  } catch (error) {
    console.log(logSymbols.error, JSON.parse(error.message).message);
  }
};
