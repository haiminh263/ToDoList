import express from 'express';
import { checkLogin } from '../controllers/loginController.js';

const loginRoutes = express.Router();

// Check login
loginRoutes.post('/check', checkLogin);

export default loginRoutes;
