import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Mutation } from 'react-apollo'
import { CHANGE_PASSWORD } from '../api'
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
  Animation
} from 'mdbreact'

class ChangePassword extends Component {
  constructor() {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
    this.state_default = Object.assign({}, this.state)
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    })

  clearInputs = () => this.setState(this.state_default)

  changePassword = (event, args) => {
    event.preventDefault()

    const { changePassword_Mutation, changePassword_status } = args
    const { flash, history, user } = this.props

    changePassword_Mutation()
      .then(() => flash(messages.changePasswordSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.changePasswordFailure, 'flash-error'))
  }

  render() {
    const { oldPassword, newPassword } = this.state

    const form = args => (
      <Row className="auth-form">
        <Col md="12">
          <Card>
            <CardBody>
              <fieldset disabled={args.changePassword_status.loading}>
                <div className="blue-grey-text text-center">
                  <h3 className="mb-5">
                    <strong>Change Password</strong>
                  </h3>
                </div>
                <Input
                  name="oldPassword"
                  onChange={this.handleChange}
                  label="Type Your Old Password"
                  value={oldPassword}
                  type="password"
                  size="sm"
                />
                <Input
                  name="newPassword"
                  onChange={this.handleChange}
                  value={newPassword}
                  label="Type Your New Password"
                  type="password"
                  size="sm"
                />
                <Row className="d-flex align-items-center mb-4">
                  <Col md="12" className="text-center">
                    <Button
                      type="submit"
                      onClick={e => this.changePassword(e, args)}
                      className="btn btn-primary btn-block btn-rounded z-depth-1"
                    >
                      Change
                    </Button>
                  </Col>
                </Row>
              </fieldset>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )

    // can't use `new` as name because `new` is already a keyword in JS
    const changePasswordInput = {
      passwords: { old: oldPassword, new: newPassword }
    }

    const changePassword_component = args => (
      <Mutation mutation={CHANGE_PASSWORD} variables={changePasswordInput}>
        {(changePassword_Mutation, changePassword_status) =>
          form({ ...args, changePassword_Mutation, changePassword_status })
        }
      </Mutation>
    )

    return changePassword_component()
  }
}

export default withRouter(ChangePassword)
