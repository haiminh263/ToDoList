import express from 'express';
import { checkSignUp } from '../controllers/signupController.js';

const signupRoutes = express.Router();

// Check sign up
signupRoutes.post('/add', checkSignUp);

export default signupRoutes;
