import { Router } from 'express';
import { getUserBorrowData } from '../controllers/borrow'; 
import {  isAuth } from "../utils/auth";

const router = Router();

router.get('/:userId', isAuth, getUserBorrowData);

export default router;
