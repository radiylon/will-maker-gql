const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    # User
    getUsers: [User]!
    # Will
    getWill(id: String!): Will!
    getWills: [Will]!
  }

  type Mutation {
    registerUser(input: RegisterInput): User!
    loginUser(username: String!, password: String!): User!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    token: String!
    createdAt: String!
    # modifiedAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Will {
    id: ID!
    firstName: String!
    middleName: String
    lastName: String!
    suffix: String!
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
    createdAt: String!
  }

  type Child {
    id: ID!
    fullName: String!
    birthDate: String! # Date
  }
`
