const {getClient} = require('./client');

module.exports.createReleasePR = async function({org, repo, version, releaseTitle}) {
  const gh = getClient();
  const tagName = `v${version}`;
  const branch = `release/${tagName}`;

  const {data} = await gh.pullRequests.create({
    owner: org,
    repo,
    head: branch,
    base: 'master',
    title: `Release ${tagName}: ${releaseTitle}`
  });

  return data;
};

module.exports.createMasterDevelopPR = async function({org, repo}) {
  const gh = getClient();

  const {data} = await gh.pullRequests.create({
    owner: org,
    repo,
    head: 'master',
    base: 'develop',
    title: `Merge 'master' back to 'develop'`
  });

  return data;
};
