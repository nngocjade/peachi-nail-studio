const express = require("express");
const nailTrends = require("./data/nailtrends.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/api/nailTrends", (req, res) => {
  res.json(nailTrends);
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
