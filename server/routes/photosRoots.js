const express = require("express");
const router = express.Router();
const photosData = require("../controller/photos");
const Middleware = require("../middleware/FileHandler");

router.route("/getphotos").get(photosData.getPhotos);

router
  .route("/insertphotos")
  .post(Middleware.uploads.single("portfolio_photo"), photosData.insertPhotos);

router
  .route("/updatephotos/:id")
  .put(Middleware.uploads.single("portfolio_photo"), photosData.updatePhotos);

router.route("/deletephotos").delete(photosData.getPhotos);

module.exports = router;
