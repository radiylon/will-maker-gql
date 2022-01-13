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
    // TODO: move to schema statics
    createWill: async (_, { input }, context) => {
      // check if user has auth
      const user = helpers.checkAuthHeader(context);
      try {
        // check for existing will for standard users
        if (!user.isAdmin) {
          const existingWill = await Will.find({ userId: user.id });
          if (existingWill?.length >= 1) {
            // user already has a will
            throw new Error('User already has a will');
          }
        }
        
        // create new will
        const newWill = new Will({
          ...input,
          userId: user.id,
          username: user.username,
          createdAt: new Date().toISOString()
        });
        // save document to db
        const will = await newWill.save();
        return will;  
      } catch (err) {
        throw new Error(err);
      }
    },
    updateWill: async (_, { id, input }, context) => {
      // update modified property
      input.modifiedAt = new Date().toISOString();
      const will = await Will.updateWill(id, input, context);
      return will;
    },
    // TODO: move to schema statics
    deleteWill: async (_, { id }, context) => {
      // check if user has auth
      const user = helpers.checkAuthHeader(context);
      try {
        const will = await Will.findById(id);
        if (user.id === will.userId.toString() || user.isAdmin) {
          return await will.delete();
        } else {
          throw new AuthenticationError('Invalid action');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
}

module.exports = resolvers;
