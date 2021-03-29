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

// ====================== ADMIN only ==========================

// @desc    Delete a nail design
// @route   DELETE /api/nailDesigns/:id
// @access  Private/Admin
const deleteNailDesign = asyncHandler(async (req, res) => {
  const nailDesign = await NailDesigns.findById(req.params.id);

  if (nailDesign) {
    await nailDesign.remove();
    res.json({ message: "Nail design removed" });
  } else {
    res.status(404);
    throw new Error("Nail design not found");
  }
});

module.exports = { getNailDesigns, deleteNailDesign };
