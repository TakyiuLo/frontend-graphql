import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { SIGN_IN_PAYLOAD } from '../api'
import { compose, withApollo } from 'react-apollo'

const AuthenticatedRoute = ({
  component: Component,
  render,
  client,
  ...rest
}) => {
  const result = client.watchQuery({ query: SIGN_IN_PAYLOAD }).currentResult()
  const user = result.data.user

  if (user && render) {
    return <Route {...rest} render={render} />
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          // The Purpose of create a Component is because this will actutally create
          // a Component holding all props such as history that React can render to
          // inform user about there is a problem on Route
          user ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    )
  }
}

export default compose(withApollo)(AuthenticatedRoute)
