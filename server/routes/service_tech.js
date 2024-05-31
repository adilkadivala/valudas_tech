const express = require("express");
const router = express.Router();
const service_technologies = require("../controller/services_technologies");

router
  .route("/getservicetech")
  .get(service_technologies.getService_technologies);

router
  .route("/setservicetech")
  .post(service_technologies.postService_technologies);

router
  .route("/deleteservicetech/:id")
  .delete(service_technologies.deleteService_technologies);

module.exports = router;
