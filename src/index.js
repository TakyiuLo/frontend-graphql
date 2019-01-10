// React requirements
import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

// MDBReact necessities
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

// https://github.com/styled-components/styled-components

// Using BrowserRouter rather than HashRouter because the sometimes third-party
// api won't allow HashRouter such as Google's OAuth
import { BrowserRouter as Router } from 'react-router-dom'
import Apollo from './Apollo'

const clientUrl = () => {
  if (window.location.hostname === 'localhost') {
    return ''
  } else {
    return '/frontend-graphql'
  }
}

const appJsx = (
  <Router basename={clientUrl()}>
    <Apollo />
  </Router>
)

ReactDOM.render(appJsx, document.getElementById('root'))
