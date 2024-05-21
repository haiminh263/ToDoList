import Task from '../models/taskModel.js'; // Import Task model (đảm bảo bạn đã định nghĩa Model cho các nhiệm vụ)

export const getCompleted = async (req, res) => {
  try {
    const userID = req.params.userID;

    const completedTasks = await Task.find({ isCompleted: true, user_id: userID }).sort({ dueDate: 1 }); // Tìm các nhiệm vụ có isCompleted là true
    res.status(200).json(completedTasks); // Trả về danh sách các nhiệm vụ đã hoàn thành
  } catch (error) {
    res.status(500).json({ error: 'Lỗi trong quá trình truy vấn dữ liệu' });
  }
};
