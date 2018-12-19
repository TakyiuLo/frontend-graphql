import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Fa,
  MenuItemLink
} from 'mdbreact'
import { LinkContainer } from 'react-router-bootstrap'
import VisibilitySensor from 'react-visibility-sensor'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapse: false,
      isWideEnough: false
    }
  }
  onClick = () => {
    this.setState({
      collapse: !this.state.collapse
    })
  }
  visibleChange = isVisible => {
    this.setState({ isWideEnough: !isVisible })
  }
  componentWillUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.user !== this.props.user) {
      this.setState({
        user: this.props.user
      })
      // console.log('new user')
    }
  }
  render() {
    const { collapse, isWideEnough } = this.state
    const { user } = this.props
    
    const authenticatedOptions = (
      <React.Fragment>
        <NavItem>
          <Dropdown size="md">
            <DropdownToggle nav caret>
              <Fa icon="cog" size="xs" />
            </DropdownToggle>
            <DropdownMenu className="DropdownMenu" right={isWideEnough}>
              <DropdownItem>
                <NavLink to="/change-password">
                  Change Password
                  <Fa className="ml-2" icon="exchange" size="xs" />
                </NavLink>
              </DropdownItem>
              <DropdownItem >
                <NavLink to="/sign-out">
                  Sign Out
                  <Fa className="ml-2" icon="sign-out" size="xs" />
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      </React.Fragment>
    )

    const unauthenticatedOptions = (
      <React.Fragment>
        <NavItem>
          <NavLink to="/sign-up">
            Sign Up
            <Fa className="ml-2" icon="level-up" size="xs" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/sign-in">
            Sign In
            <Fa className="ml-2" icon="sign-in" size="xs" />
          </NavLink>
        </NavItem>
      </React.Fragment>
    )

    const alwaysOptions = (
      <React.Fragment>
        <NavItem>
          <NavLink className="HomeLink" to="/">
            <Fa
              icon="home"
              size="xs"
              className={`${isWideEnough ? '' : 'mr-2'}`}
            />
            {isWideEnough ? '' : 'Home'}
          </NavLink>
        </NavItem>
      </React.Fragment>
    )

    return (
      <header className="main-header">
        <Navbar className="Navbar" dark expand="md" scrolling>
          <NavbarBrand>
            <strong>Uber</strong>
          </NavbarBrand>
          <VisibilitySensor onChange={this.visibleChange}>
            <NavbarToggler onClick={this.onClick} />
          </VisibilitySensor>
          <Collapse isOpen={collapse} navbar>
            <NavbarNav left>{alwaysOptions}</NavbarNav>
            <NavbarNav right>
              {user && <NavItem><NavLink to='/'>Welcome, {user.email}</NavLink></NavItem>}
              {user ? authenticatedOptions : unauthenticatedOptions}
            </NavbarNav>
          </Collapse>
        </Navbar>
      </header>
    )
  }
}

export default Header
