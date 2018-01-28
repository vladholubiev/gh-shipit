const _ = require('lodash');
const gql = require('graphql-tag');
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
  const {data: {organization: {repositories: {edges}}}} = await gh.query({
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

  return _.map(edges, edge => {
    return {
      repo: _.get(edge, 'node.name', ''),
      releases: _.map(_.get(edge, 'node.releases.edges', []), e => ({
        publishedAt: new Date(e.node.publishedAt),
        name: _.get(e, 'node.name', ''),
        version: _.get(e, 'node.tag.name', ' ').slice(1)
      }))
    };
  });
};
