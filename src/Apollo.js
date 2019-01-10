import React, { Component } from 'react'

// require App to render
import App from './App'

// Apollo client to connect to backend
// ApolloProvider for providing results to entire App
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

// require for setup authentication
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

// setup cache / store
import cache from './store'

// apiUrl
import apiUrl from './apiConfig'

// using Apollo
const Apollo = () => {
  let authorization = ''

  const setAuth = token => (authorization = `Token token=${token}`)

  const uri = apiUrl + '/graphql'

  // our basic link1
  const httpLink = createHttpLink({ uri })

  // we need this to set authorization header with token for authenticate requests
  // without this we won't be able to do send token to our backend such as signOut
  const authLink = setContext((_, { headers }) => ({
    headers: { ...headers, authorization }
  }))

  // setup our client
  const client = new ApolloClient({ link: authLink.concat(httpLink), cache })

  return (
    <ApolloProvider client={client}>
      <App setAuth={setAuth} client={client} />
    </ApolloProvider>
  )
}

export default Apollo
