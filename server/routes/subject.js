const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, userapproved, adminCheck } = require("../middleware/auth");

// controller

const { remove } = require("../controller/cloudinary");
const {
  addsubject,
  viewpaper,
  viewsubject,
  uploapaperdata,
  deletePaper,
  // updaterandom,
} = require("../controller/subject");

router.post("/add-subject", authCheck, adminCheck, addsubject);
router.get("/view-subject", authCheck, userapproved, viewsubject);
router.post("/removepaper", authCheck, userapproved, remove);
router.post("/upload-paper", authCheck, userapproved, uploapaperdata);
router.get("/view-paper/:id", authCheck, userapproved, viewpaper);
router.post("/delete-paper", authCheck, adminCheck, deletePaper);
// router.post("/update-random-no", authCheck, adminCheck, updaterandom);

module.exports = router;
