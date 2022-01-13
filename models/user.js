const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  token: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: String,
  // TODO: modifiedAt: String,
});

module.exports = model('User', userSchema);
