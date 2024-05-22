const express = require("express");
const router = express.Router();
const servicesData = require("../controller/services");

router.route("/getservice").get(servicesData.getServices);
router.route("/postservice").post(servicesData.postServices);
router.route("/updateservice/:id").put(servicesData.updateServices);
router.route("/deleteservice/:id").delete(servicesData.deleteService);

module.exports = router;