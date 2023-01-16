const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    sem: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("subject", subjectSchema);
