const _ = require('lodash');

module.exports.getFirstOpenReleasePR = function(prs) {
  if (_.isEmpty(prs)) {
    return {
      isReadyToMerge: false,
      reason: 'No open PRs present'
    };
  }

  const prsWithReleaseLabel = _.filter(prs, pr => {
    const labels = _.map(_.get(pr, 'labels.nodes'), 'name', []);

    return _.includes(labels, 'release');
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
};
