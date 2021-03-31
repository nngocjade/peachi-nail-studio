const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  creator: {
    type: String,
  },
  tags: {
    type: [String],
  },
  image: {
    type: String,
    required: true,
    unique: true,
  },
  linkCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const blogPost = mongoose.model("blogPost", postSchema);

module.exports = blogPost;
