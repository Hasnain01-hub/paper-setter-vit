const User = require("../models/user");

//to create or update user
exports.createOrUpdateUser = async (req, res) => {
  const { email, phone, photourl } = req.body;
  console.log(email, phone, photourl);
  const user = await User.findOneAndUpdate(
    { email },
    {
      ...{
        name: req.body.email.split("@")[0],
        picture: photourl,
      },
    },
    { new: true }
  );

  if (user) {
    res.json(user);
  } else {
    const newUser = await User({
      email,
      name: email.split("@")[0],
      picture: photourl,
      approved: false,
      phone: phone,
      role: "user",
    })
      .save()
      .exec((e) => {
        console.log("user created" + e);
      });
    res.json(newUser);
  }
};
// exports.pushuser = async (req, res) => {
//   const email = "hasnainsayyed833@gmail.com";
//   console.log(email);
//   await User({
//     email: email,
//     name: email.split("@")[0],
//     picture: "hshs",
//     approved: false,
//     phone: "1234567890",
//     role: "user",
//   }).save();
//   res.status(200).json({ message: "user added" });
// };

//to get current user
exports.currentUser = async (req, res) => {
  await User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};

exports.userlist = async (req, res) => {
  let user = await User.find({}).sort({ createdAt: -1 }).exec();
  res.json(user);
  // console.log(user);
};
exports.updateuser = async (req, res) => {
  const { email, approved, role } = req.body.user;

  const user = await User.findOneAndUpdate(
    { email },
    { ...{ approved: approved, role: role } },
    {
      new: true,
    }
  );
  res.json(user);
  console.log(user);
};
