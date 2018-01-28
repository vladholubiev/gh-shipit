const logSymbols = require('log-symbols');
const {askToOpenPR} = require('../inquirer');
const {createMasterDevelopPR} = require('../client-prs');

module.exports.prMasterDevelop = async function({org, repo}) {
  try {
    const {number} = await createMasterDevelopPR({org, repo});
    console.log(logSymbols.success, `Created Pull Request #${number}!`);

    await askToOpenPR({org, repo, pr: number});
  } catch (error) {
    console.log(logSymbols.error, JSON.parse(error.message).message);
  }
};
