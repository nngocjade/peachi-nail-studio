const express = require("express");

const router = express.Router();
const { getNailDesigns } = require("../controllers/nailDesignControllers");

router.route("/").get(getNailDesigns);

module.exports = router;
