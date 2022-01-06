const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = gql`
  type Query {
    welcome: String!
  }
`

const resolvers = {
  Query: {
    welcome: () => {
      return 'Hello, world!';
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// mongoose.connect()

server.listen({ port: 5001 })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });
