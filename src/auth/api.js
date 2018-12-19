const apiUrl = require('../apiConfig')

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const signUp = credentials => {
  return fetch(apiUrl + '/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    })
  })
}

export const signIn = credentials => {
  return fetch(apiUrl + '/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credentials: {
        email: credentials.email,
        password: credentials.password,
      }
    })
  })
}

export const signOut = user => {
  return fetch(apiUrl + '/sign-out', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return fetch(apiUrl + '/change-password', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    })
  })
}

/*************************************
 ******     GraphQL Below       ******
 *************************************/

import gql from 'graphql-tag'

// By putting /* GraphQL */gql below will make language-babel to auto 
// highlight GraphQL syntax (make sure you use language-babel to see effects)

export const SIGN_UP = /* GraphQL */gql`
  mutation signUp ($credentials: SignUpInput!) {
    signUp (credentials : $credentials) {
      id
      email
    }
  }
`

export const SIGN_IN = /* GraphQL */gql`
  mutation signIn ($credentials: SignInInput!) {
    signIn (credentials: $credentials) {
      id
      email
      token
    }
  }
`

export const CHANGE_PASSWORD = /* GraphQL */gql`
  mutation changePassword ($passwords: ChangePasswordInput!) {
    changePassword (passwords: $passwords) {
      status
      message
    }
  }
`

export const SIGN_OUT = /* GraphQL */gql`
  mutation signOut {
    signOut {
      status
      message
    }
  }
`
