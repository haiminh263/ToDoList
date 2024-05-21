import mongoose from 'mongoose';
import Task from '../models/taskModel.js';

export const getAllTasks = async (req, res) => {
  try {
    const userID = req.params.userID;

    const tasks = await Task.find({user_id: userID}).sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const task = new Task(req.body);
  task.task_id = task._id;
  // const userID = req.params.userID;
  // task.user_id = userID;
  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const taskUpdate = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No task with id: ${id}`);
    }
  
    try {
      await Task.findByIdAndUpdate(id, taskUpdate);
      res.status(200).json({ message: "Task updated successfully." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  export const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No task with id: ${id}`);
    }
  
    try {
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  