import express from "express";
import 'express-async-errors';
import { register, login } from '../controllers/auth'

const router = express.Router()

router.post('/register', register);
router.post('/login', login)
export default router;