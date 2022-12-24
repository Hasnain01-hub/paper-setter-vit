const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subjectname: {
      type: String,
      required: true,
    },
    subjectcode: {
      type: String,
      required: true,
    },
    subjecteacher: {
      type: String,
      required: true,
    },
    subjectpaper: {
      type: Array,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subject", subjectSchema);
