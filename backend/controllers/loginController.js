import mongoose from 'mongoose';
import User from '../models/userModel.js';

export const checkLogin = async (req, res) => {
  const now_email = req.body.email;
  const now_pass = req.body.password;

  // In ra req.body để kiểm tra
  console.log(req.body);
  try {
    // Tìm user trong collection User với email được cung cấp
    const user = await User.findOne({ email: now_email });

    // Kiểm tra nếu không tìm thấy user hoặc password không khớp
    if (!user) {
      console.log("100");
      return res.status(401).json({ message: "Invalid email." });
    } else if(user.password !== now_pass){
      console.log("101");
      return res.status(401).json({ message: "Invalid password." });
    } else{
    // Nếu tìm thấy user và password khớp, trả về user thông qua response
      // console.log(user.email);
      res.status(200).json(user._id);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
