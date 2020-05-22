import ApolloClient from 'apollo-boost'

import { REACT_APP_GRAPHQL_API_URL } from '../constants/envValues'

export const apolloClient = new ApolloClient({
  uri: REACT_APP_GRAPHQL_API_URL
})
