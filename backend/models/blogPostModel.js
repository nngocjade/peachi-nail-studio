const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    image: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model("BlogPost", postSchema);

module.exports = BlogPost;
