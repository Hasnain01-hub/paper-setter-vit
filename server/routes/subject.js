const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middleware/auth");

// controller

const { addsubject } = require("../controller/subject");

router.post("/add-subject", authCheck, adminCheck, addsubject);
module.exports = router;
