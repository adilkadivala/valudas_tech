const express = require("express");
const router = express.Router();
const techStackData = require("../controller/techstack");

router.route("/getstack").get(techStackData.getTechStack);
router.route("/poststack").post(techStackData.postTechStack);
router.route("/updatestack/:id").put(techStackData.updateTechStack);
router.route("/deletestack/:id").delete(techStackData.deleteTechStack);

module.exports = router;
