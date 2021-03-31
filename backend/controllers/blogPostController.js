const asyncHandler = require("express-async-handler");
const BlogPost = require("../models/blogPostModel");

// ====================== GET ALL BLOG POSTS ====================

const getBlogPosts = asyncHandler(async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({});

    console.log("blogPosts", blogPosts);

    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ====================== CREATE BLOG POST ====================

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

// ====================== UPDATE BLOG POST ====================

const updateBlogPost = asyncHandler(async (req, res) => {
  const { title, description, creator, image } = req.body;

  const blogPost = await BlogPost.findById(req.params.id);

  if (blogPost) {
    blogPost.title = title;
    blogPost.description = description;
    blogPost.image = image;
    blogPost.creator = creator;

    const updatedBlogPost = await blogPost.save();
    res.json(updatedBlogPost);
  } else {
    res.status(404);
    throw new Error("Blog post not found");
  }
});

module.exports = {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
};
