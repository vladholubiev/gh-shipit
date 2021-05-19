export default {
  valid: [
    {
      title: 'Release v0.4.0: Some PR title',
      baseRefName: 'master',
      headRefName: 'release/v0.4.0',
      mergeable: 'MERGEABLE',
      viewerCanUpdate: true,
      number: 1,
      labels: {
        nodes: [{name: 'release', __typename: 'Label'}],
        __typename: 'LabelConnection',
      },
      reviews: {
        nodes: [
          {
            state: 'APPROVED',
            author: {login: 'some-reviewer-username', __typename: 'User'},
            __typename: 'PullRequestReview',
          },
        ],
        __typename: 'PullRequestReviewConnection',
      },
      __typename: 'PullRequest',
    },
  ],
  invalid: {
    noOpenPRs: [],
    noPRForThisVersion: [
      {
        title: 'Release v0.5.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.5.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        number: 1,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection',
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview',
            },
          ],
          __typename: 'PullRequestReviewConnection',
        },
        __typename: 'PullRequest',
      },
    ],
    noReleaseLabel: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        number: 1,
        labels: {
          nodes: [],
          __typename: 'LabelConnection',
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview',
            },
          ],
          __typename: 'PullRequestReviewConnection',
        },
        __typename: 'PullRequest',
      },
    ],
    noApproves: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        number: 1,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection',
        },
        reviews: {
          nodes: [],
          __typename: 'PullRequestReviewConnection',
        },
        __typename: 'PullRequest',
      },
    ],
    hasDontMergeLabel: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        number: 1,
        labels: {
          nodes: [
            {name: 'release', __typename: 'Label'},
            {name: `don't-merge`, __typename: 'Label'},
          ],
          __typename: 'LabelConnection',
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview',
            },
          ],
          __typename: 'PullRequestReviewConnection',
        },
        __typename: 'PullRequest',
      },
    ],
    notToMaster: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'develop',
        headRefName: 'release/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        number: 1,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection',
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview',
            },
          ],
          __typename: 'PullRequestReviewConnection',
        },
        __typename: 'PullRequest',
      },
    ],
    notFromReleaseBranch: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'something/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: true,
        number: 1,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection',
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview',
            },
          ],
          __typename: 'PullRequestReviewConnection',
        },
        __typename: 'PullRequest',
      },
    ],
    notMergeable: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.4.0',
        mergeable: 'CONFLICTING',
        viewerCanUpdate: true,
        number: 1,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection',
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview',
            },
          ],
          __typename: 'PullRequestReviewConnection',
        },
        __typename: 'PullRequest',
      },
    ],
    noAccessToMerge: [
      {
        title: 'Release v0.4.0: Some PR title',
        baseRefName: 'master',
        headRefName: 'release/v0.4.0',
        mergeable: 'MERGEABLE',
        viewerCanUpdate: false,
        number: 1,
        labels: {
          nodes: [{name: 'release', __typename: 'Label'}],
          __typename: 'LabelConnection',
        },
        reviews: {
          nodes: [
            {
              state: 'APPROVED',
              author: {login: 'some-reviewer-username', __typename: 'User'},
              __typename: 'PullRequestReview',
            },
          ],
          __typename: 'PullRequestReviewConnection',
        },
        __typename: 'PullRequest',
      },
    ],
  },
};
