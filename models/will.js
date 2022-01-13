const { model, Schema } = require('mongoose');
const user = require('./user');
const { checkAuthHeader } = require('../util/helpers');
const { AuthenticationError } = require('apollo-server');

const willSchema = new Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  suffix: String,
  preferredName: String,
  birthDate: Date,
  relationshipStatus: String,
  hasChildren: Boolean,
  children: [{
    fullName: String,
    birthDate: Date,
  }],
  stateOfResidence: String,
  hasAttorneyAddOn: Boolean,
  phoneNumber: String,
  isCompleted: Boolean,
  isEditable: Boolean,
  createdAt: String,
  modifiedAt: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: user,
  }
});

willSchema.statics.updateWill = async function (id, input, context) {
  // check if user has auth
  const user = checkAuthHeader(context);
  try {
    let will = await this.findById(id);
    if (will) {
      if (user.id === will.userId.toString()) {
        return await this.findOneAndUpdate({ id }, input, { new: true });
      } else {
        throw new AuthenticationError('Invalid action');
      }
    } else {
      throw new Error('Will does not exist');
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = model('Will', willSchema);
