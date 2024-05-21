import User from '../models/userModel.js'; // Import User model (đảm bảo bạn đã định nghĩa Model cho người dùng)

// Hàm hiển thị thông tin người dùng dựa trên email
export const getInfo = async (req, res) => {
  try {
    // Lấy email từ local storage
    const userID = req.params.userID;
    // console.log(userID);

    // Kiểm tra nếu không có email trong local storage
    if (!userID) {
      return res.status(400).json({ error: 'User không tồn tại trong local storage' });
    }

    // Tìm người dùng dựa trên email
    const user = await User.findOne({ _id: userID });

    // Kiểm tra nếu không tìm thấy người dùng
    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    // Trả về thông tin người dùng
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi trong quá trình truy vấn dữ liệu' });
  }
};

// Hàm sửa thông tin người dùng trong bảng users
export const changeInfo = async (req, res) => {
  try {
    const { userId } = req.params; // Lấy userId từ tham số đường dẫn
    const updatedUserInfo = req.body; // Lấy thông tin người dùng cần sửa từ body của yêu cầu
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserInfo, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }

    res.status(200).json(updatedUser); // Trả về thông tin người dùng sau khi sửa
  } catch (error) {
    res.status(500).json({ error: 'Lỗi trong quá trình cập nhật thông tin người dùng' });
  }
};
