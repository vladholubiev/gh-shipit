const octokit = require('@octokit/rest')();

let client;

module.exports.getClient = function() {
  if (client) {
    return client;
  }

  octokit.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
  });

  client = octokit;

  return client;
};
