const express = require("express");

const router = express.Router();
const { getNailDesigns } = require("../controllers/nailDesignController");

router.route("/").get(getNailDesigns);

module.exports = router;
