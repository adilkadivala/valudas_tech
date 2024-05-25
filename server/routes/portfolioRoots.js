const express = require("express");
const router = express.Router();
const portfolioData = require("../controller/portfolio");
const Middleware = require("../middleware/FileHandler");

router.route("/getportfolio").get(portfolioData.getPortfolio);

router
  .route("/insertportfolio")
  .post(Middleware.uploads.single("image"), portfolioData.insertPortfolio);

router
  .route("/updateportfolio/:id")
  .post(Middleware.uploads.single("image"), portfolioData.updatePortfolio);

router.route("/deleteportfoli").delete(portfolioData.deletePortfolio);

module.exports = router;
