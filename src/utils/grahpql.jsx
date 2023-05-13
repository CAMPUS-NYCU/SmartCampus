// import ApolloClient from 'apollo-boost'
import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import {
  VITE_GRAPHQL_API_URL,
  VITE_GRAPHQL_WEBSOCKET_URL
} from '../constants/envValues'

const httpLink = new HttpLink({
  uri: VITE_GRAPHQL_API_URL
})

const wsLink = new WebSocketLink({
  uri: VITE_GRAPHQL_WEBSOCKET_URL,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
