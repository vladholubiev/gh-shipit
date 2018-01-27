const _ = require('lodash');
const {getClient} = require('./client');

module.exports.getLastRelease = async function({org, repo}) {
  const gh = getClient();

  try {
    const {data} = await gh.repos.getLatestRelease({owner: org, repo});

    return data.tag_name;
  } catch (error) {
    return 'v0.0.0';
  }
};

module.exports.createReleaseNotes = async function({org, repo, version, releaseTitle}) {
  const gh = getClient();
  const tagName = `v${version}`;

  const {data} = await gh.repos.createRelease({
    owner: org,
    repo,
    tag_name: tagName,
    target_commitish: `release/${tagName}`,
    name: `Release ${tagName}: ${releaseTitle}`,
    draft: true
  });

  return data;
};
