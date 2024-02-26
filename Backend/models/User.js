const mongoose = require("mongoose");
const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  mail: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
  },
  following: {
    type: Number,
  },
  posts: {
    type: Number,
  },
});

module.exports = User;
