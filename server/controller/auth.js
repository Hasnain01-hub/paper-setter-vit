const User = require("../models/user");

//to create or update user
exports.createOrUpdateUser = async (req, res) => {
  const { email, phone, photourl } = req.body;

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
    }).save();
    res.json(newUser);
  }
};

//to get current user
exports.currentUser = async (req, res) => {
  await User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};

exports.userlist = async (req, res) => {
  await User.find({})
    .sort({ createdAt: -1 })
    .exec((err, user) => {
      if (err) throw new Error(err);
      console.log(user);
      res.json(user);
    });
};
exports.updateuser = async (req, res) => {
  const { email, phone, approved, role } = req.body;
  await User.findOneAndUpdate(
    { email, approved, role },
    {
      new: true,
    }
  ).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
