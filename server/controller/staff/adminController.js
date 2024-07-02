const Admin = require("../../model/Staff/Admin");
const bcrypt = require("bcrypt");
const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPasswordMatched } = require("../../utils/helper");
const Complaint = require("../../model/Complaint");

//@desc Register Admin
//@route POST /api/v1/admins/register
//@access Private
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

  //Check if admin exist
  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    throw new Error("Admin Exist");
  }

  //register Admin
  const user = await Admin.create({
    name,
    surname,
    email,
    password: await hashPassword(password),
  });
  res.status(201).json({
    status: "success",
    data: user,
    message: "Admin registered successfully",
  });
});

//@desc Login Admin
//@route POST /api/v1/admins/login
//@access Private
exports.loginAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find user
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.json({ message: "Invalid login credentials" });
  }
  //verify password
  const isMatched = await isPasswordMatched(password, user.password);

  if (!isMatched) {
    return res.json({ message: "Invalid login credentials" });
  } else {
    return res.json({
      data: generateToken(user._id),
      message: "Admin logged in successfully",
    });
  }
});

//@desc Get All Admins
//@route GET /api/v1/admins
//@access Private
exports.getAllAdminsCtrl = AsyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: "success",
    message: "Admins fetched successfully",
    data: admins,
  });
});

//@desc Get Admin's profile
//@route GET /api/v1/admins/:id
//@access Private
exports.getAdminProfileCtrl = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!admin) {
    throw new Error("Admin Not Found");
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin profile fetched successfully",
    });
  }
});
//@desc Update Admin
//@route PUT /api/v1/admins/:id
//@access Private
exports.updateAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

  //check if email is taken
  const emailExist = await Admin.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //check if user is updating password
  if (password) {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        name,
        surname,
        email,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  } else {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        name,
        surname,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  }
});

//@desc Delete Admin
//@route DELETE /api/v1/admins/:id
//@access Private
exports.deleteAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "delete admin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Get All Complaints
//@route GET /api/v1/admins/complaints
//@access Private
exports.adminGetAllComplaints = AsyncHandler(async (req, res) => {
  const complaints = await Complaint.find();
  res.status(200).json({
    status: "success",
    message: "Complaints fetched successfully",
    data: complaints,
  });
});
