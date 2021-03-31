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
  const blogPost = req.body;

  const newBlogPost = new BlogPost(blogPost);

  try {
    await newBlogPost.save();

    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  getBlogPosts,
  createBlogPost,
};
