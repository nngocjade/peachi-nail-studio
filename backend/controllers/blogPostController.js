const asyncHandler = require("express-async-handler");
const BlogPost = require("../models/blogPostModel");

// ====================== GET ALL BLOG POSTS ====================

const getBlogPosts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;

    console.log(`keyword '${req.query.keyword}'`);

    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await BlogPost.countDocuments({ ...keyword });

    const blogPosts = await BlogPost.find({ ...keyword })
      .sort({
        createdAt: -1,
      })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res
      .status(200)
      .json({ blogPosts, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ===================== GET BLOG POST BY ID ===================

// @description       Fetch single blog post
// @route             GET /api/blogPosts/:id
// @access            Public
const getBlogPostById = asyncHandler(async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id).populate("author");
  if (blogPost) {
    res.json(blogPost);
  } else {
    res.status(404);
    throw new Error("Blog Post not found");
  }
});

const createBlogPost = asyncHandler(async (req, res) => {
  const userId = req.userId;
  try {
    const { title, body, tags, imageUrl } = req.body;
    const blogPost = new BlogPost({
      title,
      body,
      tags,
      imageUrl,
      author: userId,
    });

    const createdBlogPost = await blogPost.save();
    res.status(201).json(createdBlogPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ====================== UPDATE BLOG POST ====================

const updateBlogPost = asyncHandler(async (req, res) => {
  const { title, body, tags, imageUrl } = req.body;

  const blogPost = await BlogPost.findById(req.params.id);

  if (blogPost) {
    blogPost.title = title;
    blogPost.body = body;
    blogPost.tags = tags;
    blogPost.imageUrl = imageUrl;

    const updatedBlogPost = await blogPost.save();
    res.json(updatedBlogPost);
  } else {
    res.status(404);
    throw new Error("Blog post not found");
  }
});

// ====================== DELETE BLOG POST ====================

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

// ====================== CREATE BLOG POST REVIEW ====================

// @desc    Create a new review
// @route   POST /api/blogPosts/:id/reviews
// @access  Private
const createBlogPostReview = asyncHandler(async (req, res) => {
  const { likeCount, comment } = req.body;

  const blogPost = await BlogPost.findById(req.params.id);

  if (blogPost) {
    const alreadyReviewed = blogPost.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Blog already reviewed");
    }

    const review = {
      name: req.user.name,
      likeCount: Number(likeCount),
      comment,
      user: req.user._id,
    };

    blogPost.reviews.push(review);

    blogPost.numReviews = blogPost.reviews.length;

    blogPost.likeCount =
      blogPost.reviews.reduce((acc, item) => item.likeCount + acc, 0) /
      blogPost.reviews.length;

    await blogPost.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Blog post not found");
  }
});

module.exports = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  createBlogPostReview,
};
