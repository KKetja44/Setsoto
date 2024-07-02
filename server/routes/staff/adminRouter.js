const express = require("express");
const {
  registerAdminCtrl,
  loginAdminCtrl,
  getAllAdminsCtrl,
  getAdminProfileCtrl,
  updateAdminCtrl,
  deleteAdminCtrl,
  adminGetAllComplaints,
} = require("../../controller/staff/adminController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const adminRouter = express.Router();

//Admin Register
adminRouter.post("/register", registerAdminCtrl);

//Admin Login
adminRouter.post("/login", loginAdminCtrl);

//get all admins
adminRouter.get("/", isLogin, getAllAdminsCtrl);

//get sigle admin
adminRouter.get("/profile", isLogin, isAdmin, getAdminProfileCtrl);

//update admin
adminRouter.put("/", isLogin, isAdmin, updateAdminCtrl);

//delete admin
adminRouter.delete("/:id", deleteAdminCtrl);

//admin get all complaints
adminRouter.get("/complaints", isLogin, isAdmin, adminGetAllComplaints);

module.exports = adminRouter;
