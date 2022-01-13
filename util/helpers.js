
const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');

module.exports = {
  generateToken(user) {
    const token = jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    }, jwtSecretKey, { expiresIn: '1d' });
    return token;
  },
  checkAuthHeader(context) {
    const authHeader = context.req.headers.authorization;
    if (!authHeader) {
      throw new AuthenticationError('Authorization header is invalid');
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      throw new AuthenticationError('Token is invalid');
    }
    try {
      const user = jwt.verify(token, jwtSecretKey);
      return user;
    } catch (err) {
      throw new AuthenticationError('Token has expired');
    }
  }
}
