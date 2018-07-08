const logSymbols = require('log-symbols');

module.exports.publishRelease = async function() {
  try {
  } catch (error) {
    console.log(logSymbols.error, JSON.parse(error.message).message);
  }
};
