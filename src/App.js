import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'
import { compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { SIGN_IN_PAYLOAD } from './auth/api'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Home from './home/Home'

class App extends Component {
  constructor() {
    super()

    this.state = {
      flashMessage: '',
      flashType: null
    }
  }

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(
      () => this.setState({ flashMessage: null }),
      2000
    )
  }

  render() {
    const { flashMessage, flashType } = this.state
    const { setAuth, client } = this.props

    const result = client.watchQuery({ query: SIGN_IN_PAYLOAD }).currentResult()
    const user = result.data.user
    setAuth(user && user.token) // setAuth

    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className="container">
          <Route path="/sign-up" render={() => <SignUp flash={this.flash} />} />
          <Route path="/sign-in" render={() => <SignIn flash={this.flash} />} />
          <AuthenticatedRoute
            path="/sign-out"
            render={() => <SignOut flash={this.flash} />}
          />
          <AuthenticatedRoute
            path="/change-password"
            render={() => <ChangePassword flash={this.flash} />}
          />
          <Route user={user} exact path="/" render={() => <Home />} />
        </main>
      </React.Fragment>
    )
  }
}

export default compose(withApollo)(App)
