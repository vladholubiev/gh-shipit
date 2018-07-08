const _ = require('lodash');

module.exports.getFirstOpenReleasePR = function(prs) {
  if (_.isEmpty(prs)) {
    return {
      isReadyToMerge: false,
      reason: 'No open PRs present'
    };
  }

  const prsWithReleaseLabel = _.filter(prs, pr => {
    return hasLabel(pr, 'release');
  });

  if (_.isEmpty(prsWithReleaseLabel)) {
    return {
      isReadyToMerge: false,
      reason: 'No release label present'
    };
  }

  const prCandidate = _.first(prsWithReleaseLabel);
  const approves = _.get(prCandidate, 'reviews.nodes', []);

  if (_.isEmpty(approves)) {
    return {
      isReadyToMerge: false,
      reason: `Release PR has no approves`
    };
  }

  if (hasLabel(prCandidate, `don't-merge`)) {
    return {
      isReadyToMerge: false,
      reason: `Release PR has a "don't merge" label`
    };
  }
};

function hasLabel(pr, label) {
  const labels = getPRLabels(pr);

  return _.includes(labels, label);
}

function getPRLabels(pr) {
  return _.map(_.get(pr, 'labels.nodes'), 'name', []);
}
