const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  platform: {
    type: String,
    enum: {
      values: ['facebook', 'twitter', 'instagram'],
      message: 'Platform must be one of the following: facebook, twitter, instagram'
    },
    required: true,
  },
  posted_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);
