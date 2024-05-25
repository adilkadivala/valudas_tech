const express = require("express");
const router = express.Router();
const portfolioData = require("../controller/portfolio");
const Middleware = require("../middleware/FileHandler");

router.route("/getportfolio").get(portfolioData.getPortfolio);

router
  .route("/insertportfolio")
  .post(
    Middleware.uploads.single("thumbnail,portfolio_photos"),
    portfolioData.insertPortfolio
  );

router
  .route("/updateportfolio/:id")
  .put(
    Middleware.uploads.single("thumbnail,portfolio_photos"),
    portfolioData.updatePortfolio
  );

router.route("/deleteportfoli/:id").delete(portfolioData.deletePortfolio);

module.exports = router;
