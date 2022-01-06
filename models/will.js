const { model, Schema } = require('mongoose');

const willSchema = new Schema({ 
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  }
});

module.exports = model('Will', willSchema);