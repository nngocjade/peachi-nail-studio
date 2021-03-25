const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const nailDesigns = require("./data/nailDesigns.js");

dotenv.config();
connectDB();

const app = express();

app.get("/api/nailTrends", (req, res) => {
  res.json(nailDesigns);
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
