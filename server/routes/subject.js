const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, userapproved, adminCheck } = require("../middleware/auth");

// controller

const { remove } = require("../controller/cloudinary");
const { addsubject, viewpaper,viewsubject,uploapaperdata } = require("../controller/subject");

router.post("/add-subject", authCheck, adminCheck, addsubject);
router.get("/view-subject", authCheck, userapproved, viewsubject);
router.post("/removepaper", authCheck, userapproved, remove);
router.post("/upload-paper", authCheck, userapproved, uploapaperdata);
router.get("/view-paper", authCheck, userapproved, viewpaper);

module.exports = router;
