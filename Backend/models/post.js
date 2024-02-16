const mongoose = require("mongoose");
const List = mongoose.model("List", {
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  description: {
    type: String,    
  },
  comments: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = List;
