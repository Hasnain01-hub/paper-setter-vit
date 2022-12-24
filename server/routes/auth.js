const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middleware/auth");

// controller
const { createOrUpdateUser, register } = require("../controller/auth");
const { currentUser } = require("../controller/auth");

router.post("/create-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/register-user", authCheck, register);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;