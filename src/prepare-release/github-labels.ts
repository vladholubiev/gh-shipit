const _ = require('lodash');
const {getClient} = require('../client');

module.exports.getRepoLabels = async function({org, repo}) {
  const gh = getClient();
  const {data} = await gh.issues.listLabelsForRepo({owner: org, repo, per_page: 100});

  return _.map(data, 'name');
};

module.exports.createReleaseLabel = async function({org, repo}) {
  const gh = getClient();
  const {data} = await gh.issues.createLabel({owner: org, repo, name: 'release', color: 'ff0000'});

  return data;
};

module.exports.assignReleaseLabel = async function({org, repo, pr}) {
  const gh = getClient();
  const {data} = await gh.issues.addLabels({owner: org, repo, labels: ['release'], number: pr});

  return data;
};
