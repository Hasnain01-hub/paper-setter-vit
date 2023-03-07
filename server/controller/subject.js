const Subject = require("../models/subject");
const Paper = require("../models/paperdetails");
const Dep = require("../models/subject");
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

exports.viewsubject = async (req, res) => {
  await Subject.find({}).exec((err, data) => {
    if (err) throw new Error(err);
    res.json(data);
  });
};

//fetch paper
exports.viewpaper = async (req, res) => {
  const { id } = req.params;
  await Paper.find({ subject: id }).exec((err, data) => {
    if (err) throw new Error(err);
    res.json(data);
    console.log(data);
  });
};
exports.viewallpaper = async (req, res) => {
  await Paper.find({}).exec((err, data) => {
    if (err) throw new Error(err);
    res.json(data);
    console.log(data);
  });
};

//upload paper
exports.uploapaperdata = async (req, res) => {
  const { branch, subject, sem, addedby, paper } = req.body;
  console.log("upload paper data", req.body);
  await Paper({
    branch,
    subject,
    addedby,
    paper,
    sem,
  }).save();
  res.status(200).json({
    message: "Paper added successfully",
  });
};

exports.deletePaper = async (req, res) => {
  const { paper_id } = req.body;
  console.log("id*****************", req.body);
  await Paper.findOneAndDelete({ _id: paper_id }).exec((err, data) => {
    if (err) throw new Error(err);
    res.json("Paper deleted successfully");
    console.log("data", data);
  });
};

exports.deleteDept = async (req, res) => {
  const { dept_id } = req.body;
  console.log("id*****************", req.body);
  await Dep.findOneAndDelete({ _id: dept_id }).exec((err, data) => {
    if (err) throw new Error(err);
    res.json("Dept deleted successfully");
  });
};

// exports.updaterandom = async (req, res) => {
//   const { random } = req.body;

//   const user = await Paper.findOneAndUpdate(
//     { email },
//     { ...{ approved: approved, role: role } },
//     {
//       new: true,
//     }
//   );
//   res.json(user);
//   console.log(user);
// };
