const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const nailDesigns = require("./data/nailDesigns");
const UserModel = require("./models/userModel");
const NailDesignModel = require("./models/nailDesignModel");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await UserModel.deleteMany();
    await NailDesignModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleNailDesigns = nailDesigns.map((nailDesign) => {
      return { ...nailDesign, user: adminUser };
    });

    await NailDesignModel.insertMany(sampleNailDesigns);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await UserModel.deleteMany();
    await NailDesignModel.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
