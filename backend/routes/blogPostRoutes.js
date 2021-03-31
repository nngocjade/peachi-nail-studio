const express = require("express");

const router = express.Router();
const {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
} = require("../controllers/blogPostController");

router.get("/", getBlogPosts);
router.post("/", createBlogPost);
router.put("/:id", updateBlogPost);

module.exports = router;
