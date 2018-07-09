const _ = require('lodash');
const gql = require('graphql-tag');
const path = require('path');
const debug = require('debug')(`${require('../package').name}:${path.basename(__filename)}`);
const {getClient, getClientGraphQL} = require('./client');

module.exports.getLastRelease = async function({org, repo}) {
  const gh = getClient();

  try {
    const {data} = await gh.repos.getLatestRelease({owner: org, repo});

    return data.tag_name;
  } catch (error) {
    return 'v0.0.0';
  }
};

module.exports.getLastDraftReleaseTag = async function({org, repo}) {
  try {
    const draftReleaseTags = await module.exports.getDraftReleaseTags({org, repo});
    return _.first(_.map(draftReleaseTags, 'tag'));
  } catch (error) {
    return '';
  }
};

module.exports.getDraftReleaseTags = async function({org, repo}) {
  const gh = getClient();

  try {
    const {data} = await gh.repos.getReleases({owner: org, repo});
    const draftReleases = _.filter(data, {draft: true});

    return _.compact(
      _.map(draftReleases, release => {
        return {
          tag: release.tag_name,
          id: release.id
        };
      })
    );
  } catch (error) {
    return [];
  }
};

module.exports.publishDraftRelease = async function({org, repo, releaseId}) {
  const gh = getClient();

  const {data} = await gh.repos.editRelease({
    owner: org,
    repo,
    release_id: releaseId,
    draft: false
  });

  return data;
};

module.exports.getOpenReleasePRs = async function({org, repo}) {
  const gh = getClientGraphQL();
  debug('Loading release PRs for repo  %s', repo);

  const {
    data: {
      organization: {
        repository: {
          pullRequests: {nodes}
        }
      }
    }
  } = await gh.query({
    query: gql`
      {
        organization(login: "${org}") {
          repository(name: "${repo}") {
            pullRequests(states: [OPEN], first: 10) {
              nodes {
                title
                baseRefName
                headRefName
                mergeable
                number
                viewerCanUpdate
                labels(first: 10) {
                  nodes {
                    name
                  }
                }
                reviews(first: 10) {
                  nodes {
                    state
                    author {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  });

  return nodes;
};

module.exports.createReleaseNotes = async function({org, repo, version, releaseTitle}) {
  const gh = getClient();
  const tagName = `v${version}`;

  const {data} = await gh.repos.createRelease({
    owner: org,
    repo,
    tag_name: tagName,
    target_commitish: `release/${tagName}`,
    name: `Release ${tagName}: ${releaseTitle}`,
    draft: true
  });

  return data;
};

module.exports.getOrgReleases = async function(org) {
  const gh = getClientGraphQL();
  debug('Loading releases for org %s', org);

  const {
    data: {
      organization: {
        repositories: {edges}
      }
    }
  } = await gh.query({
    query: gql`
      {
        organization(login: "${org}") {
          repositories(first: 100) {
            edges {
              node {
                name
                releases(last: 100) {
                  edges {
                    node {
                      publishedAt
                      name
                      tag {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  });

  return edges;
};
