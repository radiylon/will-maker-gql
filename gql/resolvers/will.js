const Will = require('../../models/will');

module.exports = {
  Query: {
    async getWills() {
      try {
        const wills = await Will.find();
        return wills;
      } catch (err) {
        console.log('Error: ', err);
        throw new Error(err);
      }
    },
  }
}
