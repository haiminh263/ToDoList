import mongoose from 'mongoose';
import { format } from 'date-fns-tz';
import Task from '../models/taskModel.js';

// Lấy tất cả các công việc cho ngày hiện tại của người dùng
export const getTasksForToday = async (req, res) => {
  const userID = req.params.userID;
  
  try {
    const currentDate = format(new Date(), 'yyyy-MM-dd', { timeZone: 'Asia/Ho_Chi_Minh' });
    console.log(currentDate);

    const tasks = await Task.find({ user_id: userID, dueDate: currentDate });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


