const Resident = require("../model/Residents/Resident");

const isResident = async (req, res, next) => {
  //Find User
  const userId = req?.userAuth?._id;
  const residentFound = await Resident.findById(userId);
  //Check if user is an Admin
  if (residentFound?.role === "resident") {
    next();
  } else {
    next(new Error("Access Denied, resident only"));
  }
};

module.exports = isResident;
