const express = require("express");
const router = express.Router();
const industriesData = require("../controller/industries");

router.route("/getindustriesdata").get(industriesData.getIndustries);
router.route("/postindustrydata").post(industriesData.sendIndustry);
router.route("/updateindustrydata/:id").put(industriesData.updateIndustry);
router.route("/deleteindustrydata/:id").delete(industriesData.deleteIndustry);

module.exports = router;
