// This is already implemented in the graphqlClient.ts file
// The frontend Apollo Client is integrated by importing and using the client
// in the App component or other components that need GraphQL operations

import client from './services/graphqlClient';
import { ApolloProvider } from '@apollo/client/react';
import App from './App';

// The ApolloProvider wraps the App component to make the client available
// throughout the component tree
const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default AppWithApollo;