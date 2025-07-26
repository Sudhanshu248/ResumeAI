import express from "express";
import { signup, login, getUsername } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/signup').post(signup);  // Route for user signup
router.route('/login').post(login);  // Route for user login
router.route('/user').get(getUsername);  // Route to get authenticated user's username

export default router;
