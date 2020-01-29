import _ from 'lodash';
import gql from 'graphql-tag';
import path from 'path';
import debug0 from 'debug';
import {getClient} from '@shelf/gh-sdk/lib/rest-client';
import {getClientGraphQL} from './client';

const debug = debug0(`${require('../package').name}:${path.basename(__filename)}`);

export async function getLastRelease({org, repo}) {
  const gh = getClient();

  try {
    const {data} = await gh.repos.getLatestRelease({owner: org, repo});

    return data.tag_name;
  } catch (error) {
    return 'v0.0.0';
  }
}

export async function getLastDraftReleaseTag({org, repo}) {
  try {
    const draftReleaseTags = await getDraftReleaseTags({org, repo});

    return _.first(_.map(draftReleaseTags, 'tag'));
  } catch (error) {
    return '';
  }
}

export async function getDraftReleaseTags({org, repo}) {
  const gh = getClient();

  try {
    const {data} = await gh.repos.listReleases({owner: org, repo});
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
}

export async function getOpenReleasePRs({org, repo}) {
  const gh = getClientGraphQL();
  debug('Loading release PRs for repo %s', repo);

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
            pullRequests(states: [OPEN], labels: ["release"], first: 10) {
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
}
