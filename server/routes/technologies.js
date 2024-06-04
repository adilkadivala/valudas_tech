const express = require("express");
const router = express.Router();
const technology = require("../controller/technologies");
const Middleware = require("../middleware/FileHandler");

router.route("/getstack").get(technology.getTechStack);
router
  .route("/poststack")
  .post(
    Middleware.uploads.fields([{ name: "tech_photo", maxCount: 1 }]),
    technology.postTechStack
  );
router
  .route("/updatestack/:id")
  .put(
    Middleware.uploads.fields([{ name: "tech_photo", maxCount: 1 }]),
    technology.updateTechStack
  );
router.route("/deletestack/:id").delete(technology.deleteTechStack);

module.exports = router;
