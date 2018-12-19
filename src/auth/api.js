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
