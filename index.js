require('dotenv').config({ path: '.env' });
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
// main
const typeDefs = require('./gql/types');
const resolvers = require('./gql/resolvers');
const will = require('./models/will');
const user = require('./models/user');
const helpers = require('./util/helpers');
// const { MONGODB } = require('./config.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: helpers.createContext,
  dataSources: () => ({
    Will: will,
    User: user,
  }),
});

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected...');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });
