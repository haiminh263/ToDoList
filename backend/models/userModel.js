import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  avatar: String,
  personalInfo: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;