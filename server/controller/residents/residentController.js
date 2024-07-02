const AsyncHandler = require("express-async-handler");
const Resident = require("../../model/Residents/Resident");
const { hashPassword, isPasswordMatched } = require("../../utils/helper");
const generateToken = require("../../utils/generateToken");
const Complaint = require("../../model/Complaint");

//@desc Register Resident
//@route POST /api/v1/residents/register
//@access Public
exports.registerResident = AsyncHandler(async (req, res) => {
  const { name, surname, email, password, town } = req.body;

  //Check if account exist
  const residentFound = await Resident.findOne({ email });
  if (residentFound) {
    throw new Error("Account Exist");
  }

  //register Resident
  const user = await Resident.create({
    name,
    surname,
    email,
    password: await hashPassword(password),
    town,
  });
  res.status(201).json({
    status: "success",
    data: user,
    message: "Resident registered successfully",
  });
});

//@desc Login Resident
//@route POST /api/v1/residents/login
//@access Public
exports.loginResident = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find user
  const resident = await Resident.findOne({ email });
  if (!resident) {
    return res.json({ message: "Invalid login credentials" });
  }
  //verify password
  const isMatched = await isPasswordMatched(password, resident.password);
  if (!isMatched) {
    return res.json({ message: "Invalid login credentials" });
  } else {
    res.status(200).json({
      status: "success",
      message: "Resident logged in successfully",
      data: generateToken(resident._id),
    });
  }
});

//@desc Admin Update Resident
//@route PUT  /api/v1/residentsid/admin
//@access Private Admin Only
exports.adminUpdateResident = AsyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

  //check if email is taken
  const emailExist = await Resident.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //check if user is updating password
  if (password) {
    //update
    const resident = await Resident.findByIdAndUpdate(
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
      data: resident,
      message: "Resident updated successfully",
    });
  } else {
    //update
    const resident = await Resident.findByIdAndUpdate(
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
      data: resident,
      message: "Resident updated successfully",
    });
  }
});
//@desc Update Resident
//@route PUT /api/v1/residents/residentsid/update
//@access Private Resident Only
exports.residentUpdateProfile = AsyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

  //find manager
  const residentFound = await Resident.findOne(req.params.email);
  if (!residentFound) {
    throw new Error("Resident not found");
  }

  //check if user is updating password
  if (password) {
    //update
    const resident = await Resident.findByIdAndUpdate(
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
      data: resident,
      message: "Resident updated successfully",
    });
  } else {
    //update
    const resident = await Resident.findByIdAndUpdate(
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
      data: resident,
      message: "Resident updated successfully",
    });
  }
});

//@desc Resident Add Complaint
//@route POST /api/v1/residents/add
//@access Public
exports.residentAddComplaint = AsyncHandler(async (req, res) => {
  const { description, town, department, createdBy } = req.body;

  //Add Complaint
  const complaint = await Complaint.create({
    description,
    department,
    createdBy: req.userAuth._id,
    town,
  });
  res.status(201).json({
    status: "success",
    data: complaint,
    message: "Complaint added successfully",
  });
});
//@desc Get All Resident Complaints
//@route GET /api/v1/residents/get
//@access Private
exports.getAllResidentComplaints = AsyncHandler(async (req, res) => {
  const createdBy = req.userAuth._id;
  const filter = createdBy ? { createdBy } : {};

  const complaints = await Complaint.find(filter);
  res.status(200).json({
    status: "success",
    message: "Complaints fetched successfully",
    data: complaints,
  });
});
