const Manager = require("../model/Staff/Manager");
const verifyToken = require("../utils/verifyToken");

const isManagerLogin = async (req, res, next) => {
  //Get token from the header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  //verify token
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    //Find the user
    const user = await Manager.findById(verifiedToken.id).select(
      "name email role department"
    );
    //save the user into request object
    req.userAuth = user;
    next();
  } else {
    const err = new Error("Token expired/invalid");
    next(err);
  }
};

module.exports = isManagerLogin;
