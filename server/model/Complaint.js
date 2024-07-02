const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//model
const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
