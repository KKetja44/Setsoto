const Admin = require("../model/Staff/Admin");

const isAdmin = async (req, res, next) => {
  //Find User
  const userId = req?.userAuth?._id;
  const adminFound = await Admin.findById(userId);
  //Check if user is an Admin
  if (adminFound?.role === "admin") {
    next();
  } else {
    next(new Error("Access Denied, admin only"));
  }
};

module.exports = isAdmin;
