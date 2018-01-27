const {getClient} = require('./client');

module.exports.getLastRelease = async function({org, repo}) {
  const gh = getClient();
  const {data} = await gh.repos.getLatestRelease({owner: org, repo});

  return data.tag_name;
};

module.exports.createReleaseNotes = async function({org, repo, version}) {
  const gh = getClient();
  const tagName = `v${version}`;

  const {data} = await gh.repos.createRelease({
    owner: org,
    repo,
    tag_name: tagName,
    target_commitish: `release/${tagName}`,
    name: `Release ${tagName}: ...`,
    draft: true
  });

  return data;
};
