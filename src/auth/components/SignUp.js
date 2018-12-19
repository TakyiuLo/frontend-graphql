import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { SIGN_UP, SIGN_IN } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import { Mutation } from 'react-apollo'

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
  ModalFooter
} from 'mdbreact'

class SignUp extends Component {
  constructor() {
    super()
    
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    }
    this.state_default = Object.assign({}, this.state)
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  clearInputs = () => this.setState(this.state_default)
  
  signUp = (event, args) => {
    event.preventDefault()
    const { 
      signUp_Mutation, signUp_loading,
      signIn_Mutation, signIn_loading
    } = args
    const { flash, history, setUser } = this.props

    // Not using handleErrors or 'res.ok' anymore because GraphQL does not 
    // send 400 or 500 errors.
    signUp_Mutation()
      .then(() => signIn_Mutation())
      .then(res => ({ user: res.data.signIn }))
      .then(res => setUser(res.user))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  render() {
    
    /*
     * Mutation Component required
     *   1. - GraphQL mutation(from api.js)
     *      - variables(input object) ** make sure to match key names **
     *   2. a child function
     *      @params (mutation_function, mutation_status)
     *      @returns must return "something" <component or atleast empty string>
     */
     
    /* We have two <Mutation> here:
     *   - One for signUp, and One for signIn
     *   - The signIn <Mutation> is the return of signUp's child function, so
     *     that is nested in signUp <Mutation>
     *   - Nested <Mutation> are ugly, so seperating it to make clean looks
     * Put both mutation functions and statuses into <Form>
     * And Finally, rendered the signUp <Mutation>
     */
    
    // becareful GraphQL variables require exact Inputs
    const { email, password, password_confirmation } = this.state
     
    const form = args => (
      <Row className="auth-form">
        <Col md="12">
          <Card>
            <CardBody>
              <fieldset disabled={args.signUp_status.loading}>
                <form>
                  <div className="blue-grey-text text-center">
                    <h3 className="mb-5">
                      <strong>Sign up</strong>
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
                    size="sm"/>
                  <Input
                    name="password_confirmation"
                    onChange={this.handleChange}
                    value={password_confirmation}
                    label="Confirm Your password"
                    type="password"
                    size="sm"/>
                  <Row className="d-flex align-items-center mb-4">
                    <Col md="12" className="text-center">
                      <Button 
                        type="submit"
                        onClick={event => this.signUp(event, args)}
                        className="btn btn-primary btn-block btn-rounded z-depth-1">
                        Register
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
    const signUpInput = { credentials: this.state }

    const signIn_component = args => (
      <Mutation mutation={SIGN_IN} variables={signInInput}>
        {(signIn_Mutation, signIn_status) => (
          form({ ...args, signIn_Mutation, signIn_status })
        )}
      </Mutation>
    )  
    
    const signUp_component = args => (
      <Mutation mutation={SIGN_UP} variables={signUpInput}>
        {(signUp_Mutation, signUp_status) => (
          signIn_component({ ...args, signUp_Mutation, signUp_status })
        )}
      </Mutation>
    )

    return signUp_component()
  }
}

export default withRouter(SignUp)
