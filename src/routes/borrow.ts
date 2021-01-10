import { Router } from 'express';
import { getUserBorrowData } from '../controllers/borrow'; 

const router = Router();

router.get('/:userId', getUserBorrowData);

export default router;
