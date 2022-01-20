const { model, Schema } = require('mongoose');
const user = require('./user');
const helpers = require('../util/helpers');
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
  email: String,
  isCompleted: Boolean,
  isEditable: Boolean,
  createdAt: String,
  modifiedAt: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: user,
  }
});

willSchema.statics.createWill = async function (input, authHeader) {
  try {
    // check auth and get user info
    const user = helpers.checkAuthHeader(authHeader);
    console.log('createWill user', user);
    // check existing wills for standard users
    if (!user.isAdmin) {
      const existingWill = await this.find({ userId: user.id });
      if (existingWill?.length >= 1) {
        throw new Error('User already has a will');
      }
    }
    // create new will
    const newWill = new this({
      ...input,
      userId: user.id,
      username: user.username,
      createdAt: new Date().toISOString()
    });
    // save to db
    const will = await newWill.save();
    return will;
  } catch (err) {
    throw new Error(err);
  }
}

willSchema.statics.updateWill = async function (id, input, authHeader) {
  try {
    // check auth and get user info
    const user = helpers.checkAuthHeader(authHeader);
    // get will
    const will = await this.findById(id);
    if (will) {
      // update if authorized
      if (user.id === will.userId.toString() || user.isAdmin) {
        const newWill = await this.findOneAndUpdate({ _id: id }, input);
        return newWill;
      } else {
        throw new AuthenticationError('Unauthorized action: willSchema.statics.updateWill');
      }
    } else {
      throw new Error('Will does not exist');
    }
  } catch (err) {
    throw new Error(err);
  }
}

// TODO: update to soft delete
willSchema.statics.deleteWill = async function (id, authHeader) {
  try {
    // check auth and get user info
    const user = helpers.checkAuthHeader(authHeader);
    // get will
    const will = await this.findById(id);
    if (will) {
      // hard delete if authorized
      if (user.id === will.userId.toString() || user.isAdmin) {
        return await will.delete();
      } else {
        throw new AuthenticationError('Unauthorized action: willSchema.statics.deleteWill');
      }
    } else {
      throw new Error('Will does not exist');
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = model('Will', willSchema);
