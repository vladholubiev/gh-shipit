const gql = require('graphql-tag');
const {getClientGraphQL} = require('../client');
const path = require('path');
const debug = require('debug')(`${require('../../package').name}:${path.basename(__filename)}`);

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
          repositories(last: 50, isLocked: false, privacy: PRIVATE, orderBy: {field: PUSHED_AT, direction: DESC}) {
            edges {
              node {
                name
                releases(last: 20) {
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

  debug('Loaded org releases %o', edges);

  return edges;
};
