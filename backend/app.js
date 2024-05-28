import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoute.js';
import homeRoutes from './routes/homeRoute.js';
import importantRoutes from './routes/importantRoute.js';
import completedRoutes from './routes/completedRoute.js';
import loginRoutes from './routes/loginRoute.js';
import signupRoutes from './routes/signupRoute.js';
import todayRoutes from './routes/todayRoute.js';
import searchRoutes from './routes/searchRoute.js';

const app = express();

// Cấu hình CORS theo nhu cầu của bạn
app.use(cors());

// Parse request bodies (req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối đến cơ sở dữ liệu MongoDB
const MONGO_URI = 'mongodb://localhost:27017/ToDoListDB'; // Thay thế bằng địa chỉ MongoDB của bạn
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Sử dụng router cho các endpoint của Task
app.use('/api/tasks', taskRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/important', importantRoutes);
app.use('/api/completed', completedRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/today', todayRoutes);
app.use('/api/search', searchRoutes);

// Bình thường bạn sẽ muốn phục vụ static files cho Front-end ở đây
// app.use(express.static(join(__dirname, '../Front-end')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


