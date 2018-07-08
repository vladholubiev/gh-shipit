module.exports = {
  valid: [
    {
      title: 'Release v0.4.0: Some PR title',
      baseRefName: 'master',
      headRefName: 'release/v0.4.0',
      mergeable: 'MERGEABLE',
      viewerCanUpdate: true,
      labels: {
        nodes: [{name: 'release', __typename: 'Label'}],
        __typename: 'LabelConnection'
      },
      reviews: {
        nodes: [
          {
            state: 'APPROVED',
            author: {login: 'some-reviewer-username', __typename: 'User'},
            __typename: 'PullRequestReview'
          }
        ],
        __typename: 'PullRequestReviewConnection'
      },
      __typename: 'PullRequest'
    }
  ],
  invalid: {
    noOpenPRs: [],
    noReleaseLabel: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        labels: {
          nodes: [],
          __typename: 'LabelConnection'
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview'
            }
          ],
          __typename: 'PullRequestReviewConnection'
        },
        __typename: 'PullRequest'
      }
    ],
    noApproves: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection'
        },
        reviews: {
          nodes: [],
          __typename: 'PullRequestReviewConnection'
        },
        __typename: 'PullRequest'
      }
    ],
    hasDontMergeLabel: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        labels: {
          nodes: [
            {name: 'release', __typename: 'Label'},
            {name: `don't-merge`, __typename: 'Label'}
          ],
          __typename: 'LabelConnection'
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview'
            }
          ],
          __typename: 'PullRequestReviewConnection'
        },
        __typename: 'PullRequest'
      }
    ],
    notToMaster: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'develop',
        headRefName: 'release/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection'
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview'
            }
          ],
          __typename: 'PullRequestReviewConnection'
        },
        __typename: 'PullRequest'
      }
    ],
    notFromReleaseBranch: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'something/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection'
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview'
            }
          ],
          __typename: 'PullRequestReviewConnection'
        },
        __typename: 'PullRequest'
      }
    ],
    notMergeable: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.4.0',
        mergeable: 'CONFLICTING',
        viewerCanUpdate: true,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection'
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview'
            }
          ],
          __typename: 'PullRequestReviewConnection'
        },
        __typename: 'PullRequest'
      }
    ],
    noAccessToMerge: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: false,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection'
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview'
            }
          ],
          __typename: 'PullRequestReviewConnection'
        },
        __typename: 'PullRequest'
      }
    ]
  }
};
