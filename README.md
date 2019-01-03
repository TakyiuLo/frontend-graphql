# React Apollo Auth Template

This is a study on GraphQL. I am building a template is using MDBReact,
Apollo-client, and GraphQL. GraphQL Seems a like cool tech. So I am learning
about it.

##### Tech Used

- MDBReact, Apollo Client, GraphQL

##### Plan Taken

1. install dependences `npm install apollo-boost react-apollo graphql --save`
2. connect `Apollo-client` with <App />
3. Integrate GraphQL calls to auth template
4. (potential remake backend, because now I understand why do people make a
   Input_Type. People make it because GraphQL's api calls syntax is super
   annoying and stupid. Its really more about refactor to cleaner coding)

##### Explanation from my understanding

- Apollo GraphQL's Mutation syntax are slightly different from playground's
  syntax meaning not a uniform consistences
- Benefits from GraphQL, it does feel like to have a faster experience
- Apollo Component are ugly at some points, but sometimes its useful with
  cleaner codes. See `src/example_redundant/SignIn.js` for example
- Apollo-client vs Apollo-boost: Boost does automatic stuffs, client does manual
  stuffs

##### Using My React Auth Template

- Adjust GA react-auth-template
- npm installed `mdbreact`, `react-visibility-sensor`
- using material `Navbar`
- using material `Card`/`Form`
- Adjust `Link` using `NavLink` from `mdbreact`
- Adjusted `body` style in app.scss because putting it in index.scss doesn't work
