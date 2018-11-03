const path = require('path');
const debug = require('debug')(`${require('../package').name}:${path.basename(__filename)}`);
const {getClient} = require('./client');

module.exports.createReleasePR = async function({org, repo, version, releaseTitle}) {
  const gh = getClient();
  const tagName = `v${version}`;
  const branch = `release/${tagName}`;

  debug('Creating release PR', {org, repo, branch, version});

  const {data} = await gh.pullRequests.create({
    owner: org,
    repo,
    head: branch,
    base: 'master',
    title: `Release ${tagName}: ${releaseTitle}`
  });

  return data;
};
