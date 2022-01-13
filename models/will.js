const { model, Schema } = require('mongoose');

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
  // modifiedAt: String,
});

module.exports = model('Will', willSchema);
