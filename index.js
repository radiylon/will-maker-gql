const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
// types and resolvers
const typeDefs = require('./gql/types');
const resolvers = require('./gql/resolvers');
// const { MONGODB } = require('./config.js');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }) // context for accessing auth headers
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
