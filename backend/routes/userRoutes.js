const express = require("express");

const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} = require("../controllers/userController");

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
