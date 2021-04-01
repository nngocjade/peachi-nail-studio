const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

const {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
} = require("../controllers/blogPostController");

router.get("/", getBlogPosts);
router.post("/", protect, admin, createBlogPost);
router.put("/:id", protect, admin, updateBlogPost);

module.exports = router;
