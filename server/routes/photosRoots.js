const express = require("express");
const router = express.Router();
const photosData = require("../controller/photos");

router.route("/getphotos").get(photosData.getPhotos);

module.exports = router;
