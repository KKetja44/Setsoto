const Manager = require("../model/Staff/Manager");

const isManager = async (req, res, next) => {
  //Find User
  const userId = req?.userAuth?._id;
  const managerFound = await Manager.findById(userId);
  //Check if user is an Admin
  if (managerFound?.role === "manager") {
    next();
  } else {
    next(new Error("Access Denied, managers only"));
  }
};

module.exports = isManager;
