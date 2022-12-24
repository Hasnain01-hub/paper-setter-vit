const User = require("../models/user");

//to create or update user
exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    res.json(user);
  } else {
    const newUser = await User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.json(newUser);
  }
};

exports.register = async (req, res) => {
  // const val = await User.findOne({ email: req.user.email }).exec();
  // if (val != undefined) return console.log(val);
  // const { name, picture, email } = req.user;
  // const newUser = await User({
  //   email: email,
  //   name: email.split("@")[0],
  //   approved: false,
  //   phone: req.phone,
  //   picture: picture,
  // }).save();
  // res.json(newUser);
  console.log(req.user);
  console.log(req.phone);
};

//to get current user
exports.currentUser = async (req, res) => {
  await User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
