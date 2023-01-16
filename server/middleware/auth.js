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
      err: "Invalid or expired token",
    });
  }
  next();
};

exports.adminCheck = async (req, res, next) => {
  // const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
  try {
    const { email } = req.user;

    const adminUser = await User.findOne({ email }).exec();

    if (adminUser.role !== "admin") {
      res.status[403].json({
        err: "Admin resource. Access Denied",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
