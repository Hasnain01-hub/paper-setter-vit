const admin = require("../configs/index");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log(req.user.multiFactor.enrolledFactors[0]["phoneNumber"]);
    req.user = firebaseUser;

    // console.log("*&*&*&&", req.user);
  } catch (err) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
  next();
};

exports.adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;

    const adminUser = await User.findOne({ email }).exec();

    if (adminUser.role !== "admin") {
      res.status(403).json({
        message: "Admin resource. Access Denied",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userapproved = async (req, res, next) => {
  try {
    const { email } = req.user;

    const adminUser = await User.findOne({ email }).exec();

    if (adminUser.approved !== true) {
      res.status(403).json({
        message: "Your account is not yet approved. Access Denied",
      });
      console.log(err);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
