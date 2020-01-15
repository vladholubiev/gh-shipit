import Oktokit from '@octokit/rest';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import fetch from 'node-fetch';

const octokit = new Oktokit();
let client;
let clientGQL;

export function getClient(): Oktokit {
  if (client) {
    return client;
  }

  octokit.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
  });

  client = octokit;

  return client;
}

export function getClientGraphQL() {
  if (clientGQL) {
    return clientGQL;
  }

  const httpLink = new HttpLink({uri: 'https://api.github.com/graphql', fetch});
  const authLink = setContext((_, {headers}) => {
    const token = process.env.GITHUB_TOKEN;

    return {
      headers: {
        ...headers,
        authorization: token ? `token ${token}` : null
      }
    };
  });

  clientGQL = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return clientGQL;
}
