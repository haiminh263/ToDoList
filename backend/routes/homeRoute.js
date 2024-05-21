import express from 'express';
import { getInfo, changeInfo } from '../controllers/homeController.js';

const homeRoutes = express.Router();

// Định nghĩa route GET /info để gọi hàm getInfo
homeRoutes.get('/info/:userID', getInfo);

// Định nghĩa route PUT /changeInfo/:userId để gọi hàm changeInfo
homeRoutes.patch('/changeInfo/:userId', changeInfo);

export default homeRoutes;
