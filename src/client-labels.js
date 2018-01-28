const _ = require('lodash');
const {getClient} = require('./client');

module.exports.getRepoLabels = async function({org, repo}) {
  const gh = getClient();
  const {data} = await gh.issues.getLabels({owner: org, repo, per_page: 100});

  return _.map(data, 'name');
};
