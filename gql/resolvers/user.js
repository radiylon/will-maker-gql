const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server');
const User = require('../../models/user');
const helpers = require('../../util/helpers');
const validators = require('../../util/validators');

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find().sort({ createdAt: -1 });
        return users;
      } catch (err) {
        console.log('Error: ', err);
        throw new Error(err);
      }
    }
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      const { username, email, password, confirmPassword, isAdmin } = input;

      // validate user entered registration
      const { errors, valid } = validators.validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError('Error(s)', { errors: errors });
      }

      // validate for unique username
      const existingUser = await User.findOne({ username: username });
      if (existingUser) {
        // UserInputError for apollo server-side validation
        throw new UserInputError('Username already taken', {
          errors: {
            username: 'This username is already taken',
          }
        });
      }

      // hash password before storing
      const hashedPassword = await bcrypt.hash(password, 12);

      // TODO: maybe user dataSources instead of the model directly
      // generate newUser based on input
      const newUser = new User({
        username,
        email,
        isAdmin,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      });

      // save document to db
      const result = await newUser.save();

      // generate unique token from currentUser using jwt
      const token = helpers.generateToken(result);

      return {
        ...result._doc,
        id: result._id,
        token,
      }
    },
    loginUser: async (_, { username, password }) => {
      console.log('username1', username);
      console.log('password1', password);
      // validate login
      const { errors, valid } = validators.validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError('Error(s)', { errors: errors });
      }
      // check if user exists
      const user = await User.findOne({ username: username });
      // throw error if user doesn't exist
      if (!user) {
        errors.general = 'Username or password is incorrect';
        throw new UserInputError('Username or password is incorrect', { errors: errors });
      }

      // decrypt password and check if it matches
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      // throw error if password is incorrect      
      if (!isPasswordMatching) {
        errors.general = 'Username or password is incorrect';
        throw new UserInputError('Username or password is incorrect', { errors: errors });
      }

      // generate unique token from currentUser using jwt
      const token = helpers.generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      }      
    }
  }
}

module.exports = resolvers;
