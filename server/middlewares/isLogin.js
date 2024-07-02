const Admin = require("../model/Staff/Admin");
const verifyToken = require("../utils/verifyToken");

const isLogin = async (req, res, next) => {
  //Get token from the header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  //verify token
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    //Find the user
    const user = await Admin.findById(verifiedToken.id).select(
      "name email role"
    );
    //save the user into request object
    req.userAuth = user;
    next();
  } else {
    const err = new Error("Token expired/invalid");
    next(err);
  }
};

module.exports = isLogin;
