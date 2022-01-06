const Will = require('../../models/will');

const resolvers = {
  Query: {
    getWills: async () => {
      try {
        const wills = await Will.find();
        return wills;
      } catch (err) {
        console.log('Error: ', err);
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createWill: async () => {
      // TODO
    },
    updateWill: async () => {
      // TODO
    },
    deleteWill: async () => {
      // TODO
    }
  }
}

module.exports = resolvers;
