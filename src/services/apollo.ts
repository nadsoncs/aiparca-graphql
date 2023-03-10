import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth } from '../hooks/auth';

const httpLink = createHttpLink({
  uri: 'http://132.226.160.96/beta',
});

const authLink = setContext((_, { headers }) => {
  const { user } = useAuth();
  const token = user.token

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});