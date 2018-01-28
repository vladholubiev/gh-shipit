const {getRepoLabels} = require('./client-labels');

module.exports.hasReleaseLabel = async function({org, repo}) {
  const labels = await getRepoLabels({org, repo});

  return labels.includes('release');
};
