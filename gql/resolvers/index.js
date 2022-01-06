const userResolvers = require('./user');
const willResolvers = require('./will');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...willResolvers.Query,
  }
}