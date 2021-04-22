const express = require("express");
const asyncHandler = require("express-async-handler");
const { countDocuments } = require("../models/nailDesignModel");
const NailDesign = require("../models/nailDesignModel");

// ===================== GET ALL NAIL DESIGNS ===================

// @description   Fetch all nail designs
// @route         GET /api/nailDesigns
// @access        Public
const getNailDesigns = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword =
    req.query.keyword === "null"
      ? {}
      : {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        };
  console.log("keyword", keyword);
  const count = await NailDesign.countDocuments({ ...keyword });

  const nailDesigns = await NailDesign.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ nailDesigns, page, pages: Math.ceil(count / pageSize) });
});

// ===================== GET NAIL DESIGN BY ID ===================

// @description       Fetch single nail design
// @route             GET /api/nailDesigns/:id
// @access            Public
const getNailDesignById = asyncHandler(async (req, res) => {
  const nailDesign = await NailDesign.findById(req.params.id);
  if (nailDesign) {
    res.json(nailDesign);
  } else {
    res.status(404);
    throw new Error("Nail design not found");
  }
});

// ====================== ADMIN only ==========================

// ====================== DELETE NAIL DESIGN ====================

// @desc    Delete a nail design
// @route   DELETE /api/nailDesigns/:id
// @access  Private/Admin
const deleteNailDesign = asyncHandler(async (req, res) => {
  const nailDesign = await NailDesign.findById(req.params.id);

  if (nailDesign) {
    await nailDesign.remove();
    res.json({ message: "Nail design removed" });
  } else {
    res.status(404);
    throw new Error("Nail design not found");
  }
});

// ====================== CREATE/POST/ADD NAIL DESIGN ====================

// @desc    Create a nail design
// @route   POST /api/nailDesigns
// @access  Private/Admin
const createNailDesign = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const { name, category, style, imageUrl, description } = req.body;

  const nailDesign = new NailDesign({
    user: userId,
    name,
    category,
    style,
    imageUrl,
    description,
  });

  const createdNailDesign = await nailDesign.save();
  res.status(201).json(createdNailDesign);
});

// ====================== UPDATE NAIL DESIGN ====================

// @desc    UPDATE a nail design
// @route   PUT /api/nailDesigns/:id
// @access  Private/Admin
const updateNailDesign = asyncHandler(async (req, res) => {
  const { name, imageUrl, category, style, description } = req.body;

  const nailDesign = await NailDesign.findById(req.params.id);

  if (nailDesign) {
    nailDesign.name = name;
    nailDesign.imageUrl = imageUrl;
    nailDesign.category = category;
    nailDesign.style = style;
    nailDesign.description = description;

    const updatedNailDesign = await nailDesign.save();
    res.json(updatedNailDesign);
  } else {
    res.status(404);
    throw new Error("Nail Design not found");
  }
});

module.exports = {
  getNailDesigns,
  getNailDesignById,
  deleteNailDesign,
  createNailDesign,
  updateNailDesign,
};

// {
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   style: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   // reviews: [reviewSchema],
//   rating: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   numReviews: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
// },
