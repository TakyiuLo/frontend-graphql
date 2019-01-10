import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { SIGN_IN, SIGN_IN_PAYLOAD } from '../api'
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

class SignIn extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      mouseEnter: false
    }
    this.state_default = Object.assign({}, this.state)
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    })

  clearInputs = () => this.setState(this.state_default)

  signIn = (event, args) => {
    event.preventDefault()

    const { signIn_Mutation, signIn_status } = args
    const { flash, history, client } = this.props

    signIn_Mutation()
      .then(() => flash(messages.signInSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signInFailure, 'flash-error'))
  }

  mouseEnter = () => {
    this.setState({ mouseEnter: !this.state.mouseEnter })
  }

  render() {
    const { email, password, mouseEnter } = this.state

    const form = args => (
      <Row className="auth-form">
        <Col md="12">
          <Card>
            <CardBody>
              <fieldset disabled={args.signIn_status.loading}>
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
                    size="sm"
                  />
                  <Input
                    name="password"
                    onChange={this.handleChange}
                    value={password}
                    label="Type Your password"
                    type="password"
                    size="sm"
                  />
                  <Row className="d-flex align-items-center mb-4">
                    <Col md="12" className="text-center">
                      <Button
                        type="submit"
                        onClick={e => this.signIn(e, args)}
                        className="btn btn-primary btn-block btn-rounded z-depth-1"
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                </form>
              </fieldset>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )

    const signInInput = { credentials: { email, password } }

    const signIn_component = args => (
      <Mutation
        mutation={SIGN_IN}
        variables={signInInput}
        // write to cache
        update={(client, { data: { signIn } }) => {
          client.writeQuery({ query: SIGN_IN_PAYLOAD, data: { user: signIn } })
        }}
      >
        {(signIn_Mutation, signIn_status) =>
          form({ ...args, signIn_Mutation, signIn_status })
        }
      </Mutation>
    )

    return signIn_component()
  }
}

export default withRouter(SignIn)
