import express from 'express';
import { searchTask } from '../controllers/searchController.js';

const searchRoutes = express.Router();

// Định nghĩa các route và các hàm xử lý tương ứng
    searchRoutes.get('/searchTask/:userID/:input', searchTask);

export default searchRoutes;
