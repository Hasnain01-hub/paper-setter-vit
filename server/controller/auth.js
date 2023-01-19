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
