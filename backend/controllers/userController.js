const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken.js");

// ========================= AUTH USER LOGIN ========================

// @description   Auth user & get token
// @route         POST /api/users/login
// @access        Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// ========================= REGISTER A NEW USER ========================

// @description   Register a new user
// @route         POST /api/users
// @access        Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// ========================= GET USER PROFILE ========================

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  let user = await User.findOne({ _id: req.user._id }).populate("favorites");
  // user = await user.populate("NailDesign").execPopulate();

  console.log("user", user);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// ========================= UPDATE USER PROFILE ========================

// @desc    Update sser profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  console.log("user", user);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.imageUrl = req.body.imageUrl || user.imageUrl;

    // This runs to check if the password has changed or not, which will trigger the middleware
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      imageUrl: updatedUser.imageUrl,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * ===========================================================================
 * -------------------------------- ADMIN ONLY -------------------------------
 * ===========================================================================
 */

// ====================== GET ALL USERS =======================

// @description       Get all users
// @route             GET /api/users
// @access            Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// ====================== DELETE USER =======================

// @description       Delete user
// @route             DELETE /api/users/:id
// @access            Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// // ===================== GET USER BY ID ======================

// // @description       Get user by ID
// // @route             Get /api/users/:id
// // @access            Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// // ===================== UPDATE USER ========================

// // @description       Update user
// // @route             PUT /api/users/:id
// // @access            Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * ===========================================================================
 * -------------------------------- CLIENT ONLY -------------------------------
 * ===========================================================================
 */

// // @description       Update user
// // @route             PUT /api/users/favorites
// // @access            Private/Client
const addToFavorite = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { nailId } = req.body;

  let user = await User.findById(userId);

  if (user) {
    if (user.favorites.includes(nailId)) {
      throw new Error("Already added to favorites");
    }

    user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { favorites: nailId },
      },
      { new: true }
    );
    user = await user.populate("NailDesign").execPopulate();
    console.log("user", user);
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addToFavorite,
};
