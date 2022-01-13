const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  generateToken(user) {
    const token = jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    }, config.jwtSecretKey, { expiresIn: '1d' });
    return token;
  }
}
