const { AuthenticationError } = require('apollo-server');
const Will = require('../../models/will');
const helpers = require('../../util/helpers');


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
        const wills = await Will.find().sort({ createdAt: -1 });
        return wills;
      } catch (err) {
        console.log('Error: ', err);
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createWill: async (_, { input }, { authHeader, dataSources }) => {
      const will = await dataSources.Will.createWill(input, authHeader);
      return will;  
    },
    updateWill: async (_, { id, input }, { authHeader, dataSources }) => {
      // update modified property
      input.modifiedAt = new Date().toISOString();
      const will = await dataSources.Will.updateWill(id, input, authHeader);
      return will;
    },
    // TODO: move to schema statics
    deleteWill: async (_, { id }, { authHeader, dataSources }) => {
      const will = await dataSources.Will.deleteWill(id, authHeader);
      return will;
    }
  }
}

module.exports = resolvers;
