const User = require('../../models/will');

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.log('Error: ', err);
        throw new Error(err);
      }
    },
  }
}
