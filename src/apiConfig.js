let apiUrl
const apiUrls = {
  // PostgreSQL
  production: 'https://graphql-psql-auth-template.herokuapp.com',
  // MongoDB
  // production: 'https://graphql-auth-template.herokuapp.com',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
