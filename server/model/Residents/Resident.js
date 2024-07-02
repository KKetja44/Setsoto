const mongoose = require("mongoose");
const residentSchema = new mongoose.Schema(
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
      default: "resident",
    },
    town: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//model
const Resident = mongoose.model("Resident", residentSchema);

module.exports = Resident;
