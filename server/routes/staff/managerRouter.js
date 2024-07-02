const express = require("express");
const {
  adminRegisterManager,
  loginManager,
  getAllManagersAdmin,
  getManagerByAdmin,
  getManagerProfile,
  managerUpdateProfile,
  getAllDepartmentComplaints,
} = require("../../controller/staff/managerController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const isManager = require("../../middlewares/isManager");
const isManagerLogin = require("../../middlewares/isManagerLogin");

const managersRouter = express.Router();

managersRouter.post("/admin/register", isLogin, isAdmin, adminRegisterManager);
managersRouter.post("/login", loginManager);
managersRouter.get("/admin", isLogin, isAdmin, getAllManagersAdmin);
managersRouter.get("/profile", isManagerLogin, isManager, getManagerProfile);
managersRouter.get("/:managerID/admin", isLogin, isAdmin, getManagerByAdmin);
managersRouter.put(
  "/:managerID/update",
  isManagerLogin,
  isManager,
  managerUpdateProfile
);
managersRouter.get(
  "/complaints",
  isManagerLogin,
  isManager,
  getAllDepartmentComplaints
);

module.exports = managersRouter;
