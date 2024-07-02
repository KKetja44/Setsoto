const express = require("express");
const {
  registerResident,
  loginResident,
  residentUpdateProfile,
  residentAddComplaint,
  getAllResidentComplaints,
} = require("../../controller/residents/residentController");
const isResident = require("../../middlewares/isResident");
const isResidentLogin = require("../../middlewares/isResidentLogin");

const residentsRouter = express.Router();

residentsRouter.post("/register", registerResident);
residentsRouter.post("/login", loginResident);
residentsRouter.put(
  "/:residetsID/update",
  isResidentLogin,
  isResident,
  residentUpdateProfile
);
residentsRouter.post("/add", isResidentLogin, isResident, residentAddComplaint);
residentsRouter.get(
  "/get",
  isResidentLogin,
  isResident,
  getAllResidentComplaints
);

module.exports = residentsRouter;
