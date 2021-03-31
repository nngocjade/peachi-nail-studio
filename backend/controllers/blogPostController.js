const asyncHandler = require("express-async-handler");
const BlogPost = require("../models/blogPostModel");

const getBlogPosts = asyncHandler(async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({});

    console.log("blogPosts", blogPosts);

    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const createBlogPost = asyncHandler(async (req, res) => {
  try {
    const blogPost = new BlogPost({
      title: "Sample title",
      description: "short description",
      creator: "sample creator",
      image: "/images/sample.jpg",
      likeCount: 5,
    });

    const createdBlogPost = await blogPost.save();
    res.status(201).json(createdBlogPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  getBlogPosts,
  createBlogPost,
};
