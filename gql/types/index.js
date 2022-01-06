const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    getUsers: [User]
    getWills: [Will]
  }

  type User {
   id: ID!
   username: String!
   password: String!
   email: String
   createdAt: String
   modifiedAt: String 
  }

  type Will {
    id: ID! 
    body: String!
    createdAt: String!
    username: String!
  }
`
