const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
// mongo connection string
const { willmakerDb } = require('./config.js');
// types and resolvers
const typeDefs = require('./gql/types');
const resolvers = require('./gql/resolvers');

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
