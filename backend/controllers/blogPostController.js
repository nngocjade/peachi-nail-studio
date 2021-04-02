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

// ===================== GET BLOG POST BY ID ===================

// @description       Fetch single blog post
// @route             GET /api/blogPosts/:id
// @access            Public
const getBlogPostById = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);
  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404);
    throw new Error("Blog Post not found");
  }
});

// ====================== CREATE BLOG POST ====================

// const createBlogPost = asyncHandler(async (req, res) => {
//   try {
//     const blogPost = new BlogPost({
//       title: "Sample title",
//       description: "short description",
//       creator: "sample creator",
//       image: "/images/sample.jpg",
//       likeCount: 5,
//     });

//     const createdBlogPost = await blogPost.save();
//     res.status(201).json(createdBlogPost);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

const createBlogPost = asyncHandler(async (req, res) => {
  try {
    const blogPost = new BlogPost({
      title: "Sample title",
      description: "Add some description",
      tags: ["tag1", "tag2", "tag3", "tag4", "etc..."],
      image: "add an image link here OR browse to upload",
      creator: "who is the creator?",
    });

    const createdBlogPost = await blogPost.save();
    res.status(201).json(createdBlogPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ====================== UPDATE BLOG POST ====================

const updateBlogPost = asyncHandler(async (req, res) => {
  const { title, description, creator, tags, image } = req.body;

  const blogPost = await BlogPost.findById(req.params.id);

  if (blogPost) {
    blogPost.title = title;
    blogPost.description = description;
    blogPost.tags = tags;
    blogPost.image = image;
    blogPost.creator = creator;

    const updatedBlogPost = await blogPost.save();
    res.json(updatedBlogPost);
  } else {
    res.status(404);
    throw new Error("Blog post not found");
  }
});

// ====================== UPDATE BLOG POST ====================

// @desc    Delete a blog post
// @route   DELETE /api/blogPosts/:id
// @access  Private/Admin
const deleteBlogPost = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (blogPost) {
    await blogPost.remove();
    res.json({ message: "Blog Post removed" });
  } else {
    res.status(404);
    throw new Error("Blog Post not found");
  }
});

module.exports = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
