const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, userapproved, adminCheck } = require("../middleware/auth");

// controller

const { addsubject, viewsubject } = require("../controller/subject");

router.post("/add-subject", authCheck, adminCheck, addsubject);
router.get("/view-subject", authCheck, userapproved, viewsubject);

module.exports = router;
