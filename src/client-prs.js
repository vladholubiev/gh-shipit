const {getClient} = require('./client');

module.exports.createReleasePR = async function({org, repo, version}) {
  const gh = getClient();
  const tagName = `v${version}`;
  const branch = `release/${tagName}`;

  const {data} = await gh.pullRequests.create({
    owner: org,
    repo,
    head: branch,
    base: 'master',
    title: `Release ${tagName}: ...`
  });

  return data;
};
