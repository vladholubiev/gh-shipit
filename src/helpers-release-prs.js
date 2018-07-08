const _ = require('lodash');

module.exports.getFirstOpenReleasePR = function(prs) {
  if (_.isEmpty(prs)) {
    return {
      isReadyToMerge: false,
      reason: 'No open PRs present'
    };
  }

  const prsWithReleaseLabel = _.filter(prs, pr => hasLabel(pr, 'release'));

  if (_.isEmpty(prsWithReleaseLabel)) {
    return {
      isReadyToMerge: false,
      reason: 'No release label present'
    };
  }

  const pr = _.first(prsWithReleaseLabel);

  if (!hasApproves(pr)) {
    return {
      isReadyToMerge: false,
      reason: `Release PR has no approves`
    };
  }

  if (hasLabel(pr, `don't-merge`)) {
    return {
      isReadyToMerge: false,
      reason: `Release PR has a "don't merge" label`
    };
  }

  if (!isTargetBranchMaster(pr)) {
    return {
      isReadyToMerge: false,
      reason: `Release PR is not targeted to master branch`
    };
  }

  return {
    isReadyToMerge: true,
    title: pr.title
  };
};

function hasLabel(pr, label) {
  const labels = getPRLabels(pr);

  return _.includes(labels, label);
}

function getPRLabels(pr) {
  return _.map(_.get(pr, 'labels.nodes'), 'name', []);
}

function hasApproves(pr) {
  const approves = _.get(pr, 'reviews.nodes', []);

  return !_.isEmpty(approves);
}

function isTargetBranchMaster(pr) {
  return pr.baseRefName === 'master';
}
