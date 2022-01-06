const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    getUsers: [User]
    getWills: [Will]
  }

  type Mutation {
    registerUser(input: RegisterInput): User
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    token: String!
    createdAt: String!
    modifiedAt: String! 
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Will {
    id: ID! 
    body: String!
    createdAt: String!
    username: String!
  }
`
