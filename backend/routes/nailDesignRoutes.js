const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const NailDesigns = require("../models/nailDesignModel");

// @description   Fetch all nail designs
// @route         GET /api/nailDesigns
// @access        Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const nailDesigns = await NailDesigns.find({});
    res.json(nailDesigns);
  })
);

module.exports = router;
