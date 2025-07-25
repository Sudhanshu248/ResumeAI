import express from "express";
import { signup, login } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/user').get(login);

export default router;
