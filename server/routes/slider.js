const express = require("express");
const router = express.Router();
const sliderData = require("../controller/slider");
const Middleware = require("../middleware/FileHandler");

router.route("/getslider").get(sliderData.getSlider);
router
  .route("/setslider")
  .post(
    Middleware.uploads.fields([{ name: "image", maxCount: 1 }]),
    sliderData.setSlider
  );
router
  .route("/updateslider")
  .put(
    Middleware.uploads.fields([{ name: "image", maxCount: 1 }]),
    sliderData.updateSlider
  );

router.route("/deleteslider").delete(sliderData.deleteSlider);

module.exports = router;
