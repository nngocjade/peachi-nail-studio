const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    likeCount: { type: Number, required: true },
    comment: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.model("BlogPost", postSchema);

module.exports = BlogPost;
