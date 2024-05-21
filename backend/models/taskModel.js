import mongoose from 'mongoose';
import User from './userModel.js';

const taskSchema = new mongoose.Schema({
  task_id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Tham chiếu đến model User
  },
  title: String,
  description: String,
  isImportant: Boolean,
  dueDate: Date,
  isCompleted: Boolean,
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
