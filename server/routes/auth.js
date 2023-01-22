const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, userapproved, adminCheck } = require("../middleware/auth");

// controller
const { createOrUpdateUser, register } = require("../controller/auth");
const { currentUser, updateuser, userlist } = require("../controller/auth");

router.post("/create-user", createOrUpdateUser);
router.post("/current-user", authCheck, userapproved, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
router.get("/view-user", authCheck, adminCheck, userlist);
router.put("/update-user", authCheck, userapproved, updateuser);
module.exports = router;
