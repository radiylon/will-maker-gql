const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    # user queries
    getUsers: [User]!
    # will queries
    getWill(id: String!): Will!
    getWills: [Will]!
  }

  type Mutation {
    # user mutations
    registerUser(input: RegisterInput): User!
    loginUser(username: String!, password: String!): User!
    # will mutations
    createWill(input: WillInput): Will!
    updateWill(id: ID!, input: WillInput): Will! 
    deleteWill(id: String!): Will!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    token: String!
    isAdmin: Boolean
    createdAt: String!
    # modifiedAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    isAdmin: Boolean
  }

  type Will {
    id: ID!
    firstName: String!
    middleName: String
    lastName: String!
    suffix: String
    preferredName: String!
    birthDate: String! # Date
    relationshipStatus: String!
    hasChildren: Boolean!
    children: [Child]
    stateOfResidence: String!
    hasAttorneyAddOn: Boolean!
    phoneNumber: String!
    isCompleted: Boolean!
    isEditable: Boolean!
    createdAt: String! # Date
    modifiedAt: String! # Date
    userId: ID!
  }

  input WillInput {
    firstName: String!
    middleName: String
    lastName: String!
    suffix: String
    preferredName: String
    birthDate: String! # Date
    relationshipStatus: String!
    hasChildren: Boolean!
    children: [ChildInput]
    stateOfResidence: String!
    hasAttorneyAddOn: Boolean!
    phoneNumber: String!
    isCompleted: Boolean!
    isEditable: Boolean!
  }

"""
  type Will {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  input WillInput {
    body: String!
  }
"""

  type Child {
    id: ID!
    fullName: String!
    birthDate: String! # Date
  }

  input ChildInput {
    fullName: String!
    birthDate: String! # Date
  }
`
