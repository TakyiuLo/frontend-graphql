// React requirements
import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

// MDBReact necessities
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

// https://github.com/styled-components/styled-components

// Apollo client to connect to backend
// ApolloProvider for providing results to entire App
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

// Using BrowserRouter rather than HashRouter because the sometimes third-party
// api won't allow HashRouter such as Google's OAuth
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

// const client = new ApolloClient({
//   uri: 'http://localhost:4741/graphql'
// })

// import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'http://localhost:4741/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('SignInPayload_Token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Token token=${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const appJsx = (
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
)

ReactDOM.render(appJsx, document.getElementById('root'))
