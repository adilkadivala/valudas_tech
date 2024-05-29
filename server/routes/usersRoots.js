const express = require("express");
const router = express.Router();
const usersData = require("../controller/users");

router.route("/getuser").get(usersData.getUsers);
router.route("/postuser").post(usersData.postUsers);
router.route("/updateuser/:id").put(usersData.updateUser);
router.route("/deleteuser/:id").delete(usersData.deleteUsers);

module.exports = router;
