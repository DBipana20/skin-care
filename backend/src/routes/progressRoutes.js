import express from 'express';
import { getProgress, updateStreaks } from '../controllers/progressController.js';

const router = express.Router();

router.get('/', getProgress);
router.put('/streaks', updateStreaks);

export default router;
