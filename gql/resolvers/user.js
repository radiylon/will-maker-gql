const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const User = require('../../models/user');
const config = require('../../config');

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.log('Error: ', err);
        throw new Error(err);
      }
    }
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      const { username, email, password, confirmPassword } = input;

      // TODO: validate matching password/confirmPassword
      // TODO: validate for unique email (is this best practice when there's already a username?)
      // TODO: validate for empty username, email, password
      // TODO: validate for email format '@asdf.com'

      // validate for unique username
      const existingUser = await User.findOne({ username: username });
      console.log('existingUser', existingUser);
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

      // generate newUser based on input
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      });

      // save document to db
      const result = await newUser.save();

      // TODO: make a helper for generating token
      // generate unique token from currenetUser using jwt
      const token = jwt.sign({
        id: result.id,
        username: result.username,
        email: result.email
      }, config.jwtSecretKey, { expiresIn: '1d' });

      return {
        ...result._doc,
        id: result._id,
        token,
      }
    },
    loginUser: async (_, { username, password }) => {
      const user = await User.findOne({ username: username });

      // TODO: validate when user doesn't exist
      if (!user) {
        // throw error, username doesn't exist
      }
      
      // decrypt password and check if it matches
      const isMatching = await bcrypt.compare(password, user.password);

      // TODO: validate when password is incorrect
      if (!isMatching) {
        // throw error, password is incorrect
      }

      // TODO: make a helper for generating token
      // generate unique token from currentUser using jwt
      const token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email
      }, config.jwtSecretKey, { expiresIn: '1d' });

      return {
        ...user._doc,
        id: user._id,
        token,
      }      
    }
  }
}

module.exports = resolvers;
