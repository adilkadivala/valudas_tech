const express = require("express");
const router = express.Router();
const portfolioData = require("../controller/portfolio");
const Middleware = require("../middleware/FileHandler");

router.route("/getportfolio").get(portfolioData.getPortfolio);

router.route("/insertportfolio").post(
  Middleware.uploads.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "portfolio_photos", maxCount: 1 },
  ]),
  portfolioData.insertPortfolio
);

router.route("/updateportfolio/:id").put(
  Middleware.uploads.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "portfolio_photos", maxCount: 1 },
  ]),
  portfolioData.updatePortfolio
);

router.route("/deleteportfolio/:id").delete(portfolioData.deletePortfolio);

module.exports = router;
