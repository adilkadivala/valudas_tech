const express = require("express");
const router = express.Router();
const portfolioData = require("../controller/portfolio");

router.route("/getportfolio").get(portfolioData.getPortfolio);

module.exports = router;
