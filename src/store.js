// setup cache / store
import { InMemoryCache } from 'apollo-cache-inmemory'
// reture gql to create queries for store
import gql from 'graphql-tag'

/*
 * This file is to cache data from Apollo way of graphql requests
 * There are three ways to retreive/update cache data:
 * 1. Directly retrieve, client.cache.data.data['...']
 * 2. Write Query Model, use writeQuery and readQuery
 * 3. watchQuery to watch any change to query
 */

// cache is basically Store
const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
    case 'SignInPayload':
      return 'user'
    default:
      return null
    }
  }
})

// to retreive dataId use like this:
// client.cache.config.dataIdFromObject({
//   __typename: 'SignInPayload'
// })

export default cache
