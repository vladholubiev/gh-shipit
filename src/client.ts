import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import fetch from 'node-fetch';

let clientGQL;

export function getClientGraphQL() {
  if (clientGQL) {
    return clientGQL;
  }

  const httpLink = new HttpLink({uri: 'https://api.github.com/graphql', fetch: fetch as any});
  const authLink = setContext((_, {headers}) => {
    const token = process.env.GITHUB_TOKEN;

    return {
      headers: {
        ...headers,
        authorization: token ? `token ${token}` : null,
      },
    };
  });

  clientGQL = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return clientGQL;
}
