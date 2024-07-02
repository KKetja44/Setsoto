const AsyncHandler = require("express-async-handler");
const Manager = require("../../model/Staff/Manager");
const { hashPassword, isPasswordMatched } = require("../../utils/helper");
const generateToken = require("../../utils/generateToken");
const Complaint = require("../../model/Complaint");

//@desc Admin Register Manager
//@route POST /api/v1/managers/admin/register
//@access Private
exports.adminRegisterManager = AsyncHandler(async (req, res) => {
  const { name, surname, email, password, town, department } = req.body;
  //check if manager already exists
  const manager = await Manager.findOne({ email });
  if (manager) {
    throw new Error("Manager already exist");
  }
  //Hash password
  const hashedPassword = await hashPassword(password);
  //create manager
  const managerCreated = await Manager.create({
    name,
    surname,
    email,
    password: hashedPassword,
    town,
    department,
  });
  //send manager data
  res.status(201).json({
    status: "success",
    message: "Manager registerd successfully",
    data: managerCreated,
  });
});

//@desc Login Manager
//@route POST /api/v1/managers/login
//@access Public
exports.loginManager = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find user
  const manager = await Manager.findOne({ email });
  if (!manager) {
    return res.json({ message: "Invalid login credentials" });
  }
  //verify password
  const isMatched = await isPasswordMatched(password, manager.password);
  if (!isMatched) {
    return res.json({ message: "Invalid login credentials" });
  } else {
    res.status(200).json({
      status: "success",
      message: "Manager logged in successfully",
      data: generateToken(manager._id),
    });
  }
});

//@desc Get All Managers
//@route GET /api/v1/managers/admin
//@access Private Admin only
exports.getAllManagersAdmin = AsyncHandler(async (req, res) => {
  const managers = await Manager.find();
  res.status(200).json({
    status: "success",
    message: "Managers fetched successfully",
    data: managers,
  });
});

//@desc Get Single Manager
//@route GET /api/v1/managers/:managerID/admin
//@access Private Admin only
exports.getManagerByAdmin = AsyncHandler(async (req, res) => {
  const managerID = req.params.managerID;
  //FIND MANAGER BY ID
  const manager = await Manager.findById(managerID);
  if (!manager) {
    throw new Error("Manager not found");
  }
  res.status(200).json({
    status: "success",
    message: "Manager fetched successfully",
    data: manager,
  });
});

//@desc Manager Profile
//@route GET /api/v1/managers/profile
//@access Private Manager Only
exports.getManagerProfile = AsyncHandler(async (req, res) => {
  const manager = await Manager.findById(req.userAuth?._id).select(
    "-password -createdAt -updatedAt"
  );

  if (!manager) {
    throw new Error("Manager not found");
  }
  res.status(200).json({
    status: "success",
    data: manager,
    message: "Manager Profile fetched successfully",
  });
});

//@desc Admin Update Manager
//@route PUT  /api/v1/managersid/admin
//@access Private Admin Only
exports.adminUpdateManager = AsyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

  //check if email is taken
  const emailExist = await Manager.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //check if user is updating password
  if (password) {
    //update
    const manager = await Manager.findByIdAndUpdate(
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
      data: manager,
      message: "Manager updated successfully",
    });
  } else {
    //update
    const manager = await Manager.findByIdAndUpdate(
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
      data: manager,
      message: "Manager updated successfully",
    });
  }
});
//@desc Update Manager
//@route PUT /api/v1/managers/managersid/update
//@access Private Manager Only
exports.managerUpdateProfile = AsyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body;

  //find manager
  const managerFound = await Manager.findById(req.params.managerID);
  if (!managerFound) {
    throw new Error("Manager not found");
  }

  //check if user is updating password
  if (password) {
    //update
    const manager = await Manager.findByIdAndUpdate(
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
      data: manager,
      message: "Manager updated successfully",
    });
  } else {
    //update
    const manager = await Manager.findByIdAndUpdate(
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
      data: manager,
      message: "Manager updated successfully",
    });
  }
});

//@desc Get All Complaints in Department
//@route GET /api/v1/managers/complaints
//@access Private
exports.getAllDepartmentComplaints = AsyncHandler(async (req, res) => {
  const department = req.userAuth.department;
  const filter = department ? { department: department } : {};

  const complaints = await Complaint.find(filter);
  res.status(200).json({
    status: "success",
    message: "Complaints fetched successfully",
    data: complaints,
  });
});
