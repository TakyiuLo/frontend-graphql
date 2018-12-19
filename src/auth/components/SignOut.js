import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Mutation, compose, withApollo } from 'react-apollo'
import { SIGN_OUT } from '../api'
import messages from '../messages'

// This <Temp> class is use for handling componentDidMount
// At the time written, Apollo can't execute a mutation on mount, so a temporary
// component was written to handle mutation on mount
// Another way to do this, is without using Apollo
// Make Sure to clean cache and localStorage when signOut

class Temp extends Component {
  componentDidMount() {
    const { flash, history, clearUser, mutate, client } = this.props
    mutate()
      .finally(() => client.clearStore())
      .finally(() => localStorage.clear())
      .finally(() => flash(messages.signOutSuccess, 'flash-success'))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }
  render () {
    return '' // may make a loading icon
  }
}

const SignOut = props => (
  <Mutation mutation={SIGN_OUT} >
    {(signOut_Mutation, signOut_status) => (
      <Temp {...props} mutate={signOut_Mutation}/>
    )}
  </Mutation>
)

export default compose (
  withRouter,
  withApollo
)(SignOut)
