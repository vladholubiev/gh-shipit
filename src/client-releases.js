const _ = require('lodash');
const fp = require('lodash/fp');
const {getClient} = require('./client');

module.exports.getLastRelease = async function({org, repo}) {
  const gh = getClient();
  const {data} = await gh.repos.getLatestRelease({owner: org, repo});

  return data.tag_name;
};
