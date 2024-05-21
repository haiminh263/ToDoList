import mongoose from 'mongoose';
import User from '../models/userModel.js';

export const checkSignUp = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  console.log(req.body);

  try {
    // Kiểm tra xem có user nào có email trùng khớp không
    const existingUser = await User.findOne({ email });

    // Nếu tồn tại user có cùng email, trả về lỗi
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Kiểm tra xem password và confirm_password có khớp nhau không
    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Tạo một user mới
    const newUser = new User({
      name,
      email,
      password,
    });

    // Lưu user vào database
    await newUser.save();

    // Trả về thông báo thành công và thông tin user đã đăng ký
    res.status(201).json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
