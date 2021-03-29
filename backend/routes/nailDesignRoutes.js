const express = require("express");

const router = express.Router();
const {
  getNailDesigns,
  deleteNailDesign,
  createNailDesign,
  updateNailDesign,
  getNailDesignById,
} = require("../controllers/nailDesignController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getNailDesigns).post(protect, admin, createNailDesign);

router
  .route("/:id")
  .get(getNailDesignById)
  .delete(protect, admin, deleteNailDesign)
  .put(protect, admin, updateNailDesign);

module.exports = router;
