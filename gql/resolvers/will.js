const resolvers = {
  Query: {
    getWill: async (_, { id }, { dataSources }) => {
      try {
        const will = await dataSources.Will.findById(id);
        return will;
      } catch (err) {
        console.log('Error: ', err);
        throw new Error(err);
      }
    },
    getWillByUserId: async (_, { id }, { dataSources }) => {
      try {
        const will = await dataSources.Will.findOne({ userId: id });
        return will;
      } catch (err) {
        console.log('Error: ', err);
        throw new Error(err);
      }
    },
    getWills: async (_, {}, { dataSources }) => {
      try {
        const wills = await dataSources.Will.find().sort({ createdAt: -1 });
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
    deleteWill: async (_, { id }, { authHeader, dataSources }) => {
      const will = await dataSources.Will.deleteWill(id, authHeader);
      return will;
    }
  }
}

module.exports = resolvers;
