const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        enum: ["tips", "everyday", "pattern", "abstract", "wedding"],
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model("BlogPost", postSchema);

module.exports = BlogPost;
