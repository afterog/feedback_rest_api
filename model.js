const mongoose = require('mongoose');

const userCommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  comment: {
    type: String,
    required: true
  }
});

const UserComment = mongoose.model('UserComment', userCommentSchema);

module.exports = UserComment;
