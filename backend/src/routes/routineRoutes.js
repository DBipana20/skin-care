import express from 'express';
import {
  getRoutines,
  toggleRoutineStep,
  addRoutineStep,
  deleteRoutineStep
} from '../controllers/routineController.js';

const router = express.Router();

router.get('/', getRoutines);
router.patch('/:type/steps/:id/toggle', toggleRoutineStep);
router.post('/:type/steps', addRoutineStep);
router.delete('/:type/steps/:id', deleteRoutineStep);

export default router;
