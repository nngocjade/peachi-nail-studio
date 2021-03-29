const express = require("express");

const router = express.Router();
const {
  getNailDesigns,
  deleteNailDesign,
} = require("../controllers/nailDesignController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getNailDesigns);

router.route("/:id").delete(protect, admin, deleteNailDesign);

module.exports = router;
