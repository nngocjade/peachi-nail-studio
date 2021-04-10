/*
 client
 technician 
*/

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      //admin is the technician
      type: Boolean,
      required: true,
      default: false,
    },
    imageUrl: {
      type: String,
      required: true,
      default:
        "https://pbs.twimg.com/profile_images/602729491916435458/hSu0UjMC_400x400.jpg",
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "NailDesign" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ============ PASSWORD ENCRYPTION WHEN REGISTERING A NEW USER ==============

userSchema.pre("save", async function (next) {
  // The if statement below checks if the password has been modified
  // if password was not modified then next() is called to skip the rest of the script below it.
  //
  if (!this.isModified("password")) {
    next();
  }

  // If password is created OR has been modified then the below lines will run
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
