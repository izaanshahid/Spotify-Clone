import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PropsWithChildren } from 'react';

const client = new ApolloClient({
  uri: 'https://faget.stepzen.net/api/silly-bobcat/__graphql',
  headers: {
    Authorization:
      'apikey faget::stepzen.net+1000::a23e709f3068ba72a656b53d7c874d802b34a1134131be32d4bbf92c0b513eab',
  },
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;