import express from "express";
import { register } from '../middleware/auth'

const router = express.Router()

// router.post('/login', userController.loginOne);
router.post('/register', register);

export default router;