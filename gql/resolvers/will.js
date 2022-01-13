const Will = require('../../models/will');

const resolvers = {
  Query: {
    getWill: async (_, { id }) => {
      try {
        const will = await Will.findById(id);
        return will;
      } catch (err) {
        console.log('Error: ', err);
        throw new Error(err);
      }
    },
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
    createWill: async (_, { input }) => {
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
