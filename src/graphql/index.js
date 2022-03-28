import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
  defaultOptions,
});

const EXCHANGE_RATES = gql`
  query GetRates {
    rates(currency: "USD") {
      currency
    }
  }
`;

export default client;
export { EXCHANGE_RATES };
