import express from 'express';
import { getDiet, addFood, deleteFood } from '../controllers/dietController.js';

const router = express.Router();

router.get('/', getDiet);
router.post('/', addFood);
router.delete('/:category/:name', deleteFood);

export default router;
