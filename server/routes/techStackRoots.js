const express = require("express");
const router = express.Router();
const technology = require("../controller/technologies");

router.route("/getstack").get(technology.getTechStack);
router.route("/poststack").post(technology.postTechStack);
router.route("/updatestack/:id").put(technology.updateTechStack);
router.route("/deletestack/:id").delete(technology.deleteTechStack);

module.exports = router;
