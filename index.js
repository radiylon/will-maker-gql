const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
// dependencies
const { willmakerDb } = require('./config.js');
const Will = require('./models/will');

const typeDefs = gql`
  type Query {
    getWills: [Will]
  }

  type Will {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
`

const resolvers = {
  Query: {
    async getWills() {
      try {
        const wills = await Will.find();
        return wills;
      } catch (err) {
        console.log('Error: ', err);
        throw new Error(err);
      }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(willmakerDb, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected...');
    return server.listen({ port: 5001 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
