const _ = require('lodash');

module.exports.getOpenReleasePRForVersion = function (prs, version) {
  if (_.isEmpty(prs)) {
    return {
      isReadyToMerge: false,
      reason: 'No open PRs present in this repo',
    };
  }

  const prsForVersion = _.filter(prs, pr => _.includes(pr.title, version));

  if (_.isEmpty(prsForVersion)) {
    return {
      isReadyToMerge: false,
      reason: `No PRs found for version ${version}. Make sure PR title is correct`,
    };
  }

  const prsWithReleaseLabel = _.filter(prsForVersion, pr => hasLabel(pr, 'release'));

  if (_.isEmpty(prsWithReleaseLabel)) {
    return {
      isReadyToMerge: false,
      reason: 'No release label present',
    };
  }

  const pr = _.first(prsWithReleaseLabel);

  if (!hasApproves(pr)) {
    return {
      isReadyToMerge: false,
      reason: `Release PR has no approves`,
    };
  }

  if (hasLabel(pr, `don't-merge`)) {
    return {
      isReadyToMerge: false,
      reason: `Release PR has a "don't merge" label`,
    };
  }

  if (!isTargetBranchMaster(pr)) {
    return {
      isReadyToMerge: false,
      reason: `Release PR is not targeted to master branch`,
    };
  }

  if (!isFromReleaseBranch(pr)) {
    return {
      isReadyToMerge: false,
      reason: `Release PR is not originated from release/hotfix branch`,
    };
  }

  if (!isMergeable(pr)) {
    return {
      isReadyToMerge: false,
      reason: `Release PR has merge conflicts`,
    };
  }

  if (!canUserMerge(pr)) {
    return {
      isReadyToMerge: false,
      reason: `You don't have permissions to merge this PR. Ask someone why`,
    };
  }

  return {
    isReadyToMerge: true,
    prTitle: pr.title,
    prNumber: pr.number,
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

function isFromReleaseBranch(pr) {
  return _.startsWith(pr.headRefName, 'release/v') || _.startsWith(pr.headRefName, 'hotfix/v');
}

function isMergeable(pr) {
  return pr.mergeable === 'MERGEABLE';
}

function canUserMerge(pr) {
  return pr.viewerCanUpdate;
}
