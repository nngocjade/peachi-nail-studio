const express = require("express");

const router = express.Router();
const {
  getBlogPosts,
  createBlogPost,
} = require("../controllers/blogPostController");

router.get("/", getBlogPosts);
router.post("/", createBlogPost);

module.exports = router;
