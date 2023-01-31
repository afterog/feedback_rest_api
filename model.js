const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: String,
  user_name: String,
  user_email: {type: String, unique: true},
  rating: Number,
  comments: String
});

const User = mongoose.model('feedbacks', UserSchema);

module.exports = User;
