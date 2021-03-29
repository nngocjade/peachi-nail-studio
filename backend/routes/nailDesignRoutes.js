const express = require("express");

const router = express.Router();
const {
  getNailDesigns,
  deleteNailDesign,
  createNailDesign,
  updateNailDesign,
} = require("../controllers/nailDesignController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getNailDesigns).post(protect, admin, createNailDesign);

router
  .route("/:id")
  .delete(protect, admin, deleteNailDesign)
  .put(protect, admin, updateNailDesign);

module.exports = router;
