import gql from 'graphql-tag';
import path from 'path';
import debug0 from 'debug';
import {getClientGraphQL} from '../client';
import {name} from '../../package.json';

const debug = debug0(`${name}:${path.basename(__filename)}`);

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
          repositories(first: 50, isLocked: false, privacy: PRIVATE, orderBy: {field: PUSHED_AT, direction: DESC}) {
            edges {
              node {
                name
                releases(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
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
