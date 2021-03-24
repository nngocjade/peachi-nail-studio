const express = require("express");
const nailTrends = require("./data/nailtrends.js");

const app = express();

app.get("/api/nailTrends", (req, res) => {
  res.json(nailTrends);
});

app.listen(5000, console.log("Server running on port 5000"));
