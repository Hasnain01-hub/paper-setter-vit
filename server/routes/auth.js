const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, userapproved, adminCheck } = require("../middleware/auth");

// controller
const { createOrUpdateUser, register } = require("../controller/auth");
const { currentUser } = require("../controller/auth");

router.post("/create-user", createOrUpdateUser);
router.post("/current-user", authCheck, userapproved, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
