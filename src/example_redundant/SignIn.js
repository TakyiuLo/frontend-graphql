import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Mutation, graphql, compose, withApollo } from 'react-apollo'
import { SIGN_IN } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import './AuthForms.scss'
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Fa,
  Card,
  CardBody,
  ModalFooter,
  Animation,
  Label
} from 'mdbreact'

/*
 * This version of <SignIn> does not use the Mutation component, however meaning
 * it will lose all the benefits that comes with it such as loading state, 
 * error state, data state, etc from Apollo.
 */

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
    this.state_default = Object.assign({}, this.state)
  }

  handleChange = ({target: {name, value}}) => this.setState({ [name]: value })
  clearInputs = () => this.setState(this.state_default)
    
  signIn = event => {
    event.preventDefault()
    
    const { flash, history, setUser, submit } = this.props
    const { email, password } = this.state

    submit({ email, password })
      .then(res => ({ user: res.data.signIn }))
      .then(res => setUser(res.user))
      .then(() => flash(messages.signInSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signInFailure, 'flash-error'))
  }
  
  render () {
    const { email, password } = this.state
  
    return (
      <Row className="auth-form">
        <Col md="12">
          <Card>
            <CardBody>
              <form>
                <div className="blue-grey-text text-center">
                  <h3 className="mb-5">
                    <strong>Sign In</strong>
                  </h3>
                </div>
                <Input
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                  label="Type Your email"
                  type="email"
                  size="sm"/>
                <Input
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                  label="Type Your password"
                  type="password"
                  size="sm" />
                <Row className="d-flex align-items-center mb-4">
                  <Col md="12" className="text-center">
                    <Button 
                      type="submit"
                      onClick={this.signIn}
                      className="btn btn-primary btn-block btn-rounded z-depth-1">
                      Login
                    </Button>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

const SIGN_IN_OPTIONS = {
  name: 'signInMutation',
  props: ({ signInMutation }) => ({
    submit: credentials => signInMutation({ variables: { credentials } }),
  })
}

export default compose(
  withRouter,
  withApollo,
  graphql(SIGN_IN, SIGN_IN_OPTIONS)
)(SignIn)

// export default withRouter(SignIn)
