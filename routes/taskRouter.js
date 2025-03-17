const express = require('express')
const router = express.Router()
const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");


router.get("/", getAllTasks); // Get tasks with pagination & filtering
router.post("/", createTask); // Create a new task
router.get("/:id", getTaskById); // Get task by ID
router.put("/:id", updateTask); // Update task
router.delete("/:id", deleteTask); // Delete task

module.exports = router;