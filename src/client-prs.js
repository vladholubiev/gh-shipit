const {getClient} = require('./client');

module.exports.createReleasePR = async function({org, repo, version}) {
  const gh = getClient();
  const branch = `release/v${version}`;
  const {data} = await gh.pullRequests.create({
    owner: org,
    repo,
    head: branch,
    base: 'master'
  });

  return data;
};
