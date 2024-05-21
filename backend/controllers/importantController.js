import Task from '../models/taskModel.js'; // Import Task model (đảm bảo bạn đã định nghĩa Model cho các nhiệm vụ)

export const getImportant = async (req, res) => {
  try {
    const userID = req.params.userID;

    const importantTasks = await Task.find({ isImportant: true, user_id: userID }).sort({ dueDate: 1 }); // Tìm các nhiệm vụ có isImportant là true
    res.status(200).json(importantTasks); // Trả về danh sách các nhiệm vụ quan trọng
  } catch (error) {
    res.status(500).json({ error: 'Lỗi trong quá trình truy vấn dữ liệu' });
  }
};
