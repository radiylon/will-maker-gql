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
    registerUser: async (_, { input }, context) => {
      const { username, email, password, confirmPassword } = input;

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

      // generate unique token using jwt
      const token = jwt.sign({
        id: result.id,
        username: result.username,
        email: result.email
      }, config.jwtSecretKey, { expiresIn: '1h' });

      return {
        ...result._doc,
        id: result._id,
        token,
      }
    }
  }
}

module.exports = resolvers;
