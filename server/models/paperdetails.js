const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },

    sem: {
      type: String,
    },
    paper: {
      type: Array,
      required: true,
    },
    addedby: {
      type: String,
      required: true,
    },
    random: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("paperdetail", paperSchema);
