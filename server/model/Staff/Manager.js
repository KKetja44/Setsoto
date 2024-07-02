const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const managerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "manager",
    },
    town: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* //Hash password
managerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//verify password
managerSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; */

//model
const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
