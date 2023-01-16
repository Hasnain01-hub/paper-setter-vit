const Subject = require("../models/subject");
exports.addsubject = async (req, res) => {
  const { branch, subject, year, sem } = req.body;

  await Subject({
    branch,
    subject,
    year,
    sem,
  }).save();
  res.status(200).json({
    message: "Subject added successfully",
  });
};
