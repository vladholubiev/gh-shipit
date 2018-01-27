const octokit = require('@octokit/rest')();

let client;

function getClient() {
  if (client) {
    return client;
  }

  octokit.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
  });

  client = octokit;

  return client;
}

module.exports = {
  getClient
};
