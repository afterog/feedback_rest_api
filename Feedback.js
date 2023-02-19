const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userFeedbackSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  feedback: {
    type: String,
    required: true
  }
});

const UserFeedback = mongoose.model("UserFeedback", userFeedbackSchema);

module.exports = UserFeedback;
