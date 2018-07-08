const logSymbols = require('log-symbols');
const {askDraftReleaseVersion, askDraftReleasePRNumber} = require('../inquirer');

module.exports.publishRelease = async function({org, repo}) {
  try {
    const version = await askDraftReleaseVersion({org, repo});
    console.log(version);

    const prNumber = await askDraftReleasePRNumber({org, repo, version});
    console.log(prNumber);
  } catch (error) {
    console.log(logSymbols.error, JSON.parse(error.message).message);
  }
};
