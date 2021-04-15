const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

const {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  createBlogPostReview,
} = require("../controllers/blogPostController");

router.get("/", getBlogPosts);
router.post("/", protect, admin, createBlogPost);
router.get("/:id", getBlogPostById);
router.put("/:id", protect, admin, updateBlogPost);
router.delete("/:id", protect, admin, deleteBlogPost);

router.route("/:id/reviews").post(protect, createBlogPostReview);
module.exports = router;
