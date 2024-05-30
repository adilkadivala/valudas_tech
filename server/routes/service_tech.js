const express = require("express");
const router = express.Router();
const service_technologies = require("../controller/services_technologies");

router
  .route("/getservicetech")
  .get(service_technologies.getService_technologies);

module.exports = router;
