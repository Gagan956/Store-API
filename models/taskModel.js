const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product name must be provided"],
    },
    description: {
      type: String,
      required: [true, "Product price must be provided"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["completed", "pending"],
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "low",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
