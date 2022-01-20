
const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');

module.exports = {
  async createContext({ req }) {
    return {
      authHeader: req.headers.authorization,
    }
  },
  generateToken(user) {
    console.log('generateToken user', user);
    const token = jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    }, JWT_SECRET_KEY, { expiresIn: '1d' });
    return token;
  },
  checkAuthHeader(authHeader) {
    if (!authHeader) {
      throw new AuthenticationError('Authorization header is invalid');
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      throw new AuthenticationError('Token is invalid');
    }
    try {
      const user = jwt.verify(token, JWT_SECRET_KEY);
      return user;
    } catch (err) {
      throw new AuthenticationError('Token has expired');
    }
  }
}
