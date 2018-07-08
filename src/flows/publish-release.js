const logSymbols = require('log-symbols');
const {askDraftReleaseVersion} = require('../inquirer');

module.exports.publishRelease = async function({org, repo}) {
  try {
    const version = await askDraftReleaseVersion({org, repo});
    console.log(version);
  } catch (error) {
    console.log(logSymbols.error, JSON.parse(error.message).message);
  }
};
