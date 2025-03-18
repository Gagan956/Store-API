const Task = require("../models/taskModel");
const redisClient = require("../config/redisClient");

//  Get All Tasks with Pagination & Filtering
const getAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, priority, status } = req.query;
    const cacheKey = `tasks:${page}:${limit}:${priority || 'all'}:${status || 'all'}`;


    // check if cache exists
    const cachedTasks = await redisClient.get(cacheKey);

    if (cachedTasks) {
        return res.json(JSON.parse(cachedTasks)); // Serve from cache
    }

    const filters = {};
    if (priority) filters.priority = priority;
    if (status) filters.status = status;

    const tasks = await Task.find(filters)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit))
    .sort({ createdAt: -1 });


      // Cache for 1 hour
      await redisClient.set(cacheKey, JSON.stringify(tasks), 'EX', 3600);

    const totalTasks = await Task.countDocuments(filters);

    res.json({
      success: true,
      page: parseInt(page),
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Create a Task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    const task = new Task({ title, description, priority, status });
    await task.save();

       // Clear cache after new task creation
       await redisClient.flushall();

    res.status(201).json({ success: true, message : "Task created successfully", task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//  Get Task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  Update Task by ID
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

    // Clear cache after update
    await redisClient.flushall();

    res.json({ success: true, message : "Task Update successfully", task });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//  Delete Task by ID
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });

     // Clear cache after deletion
     await redisClient.flushall();

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,

};

