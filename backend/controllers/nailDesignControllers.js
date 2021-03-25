const express = require("express");
const asyncHandler = require("express-async-handler");
const NailDesigns = require("../models/nailDesignModel");

// @description   Fetch all nail designs
// @route         GET /api/nailDesigns
// @access        Public
const getNailDesigns = asyncHandler(async (req, res) => {
  const nailDesigns = await NailDesigns.find({});
  res.json(nailDesigns);
});

module.exports = { getNailDesigns };
