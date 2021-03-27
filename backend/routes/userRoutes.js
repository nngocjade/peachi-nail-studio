const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  authUser,
  registerUser,
  getUserProfile,
} = require("../controllers/userController");

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
