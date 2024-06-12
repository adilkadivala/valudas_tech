const express = require("express");
const router = express.Router();
const sliderData = require("../controller/slider");
const Middleware = require("../middleware/FileHandler");

router.route("/getslider").get(sliderData.getSlider);

module.exports = router;
