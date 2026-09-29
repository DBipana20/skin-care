import express from 'express';
import { getHydration, updateHydration } from '../controllers/hydrationController.js';

const router = express.Router();

router.get('/', getHydration);
router.put('/', updateHydration);

export default router;
