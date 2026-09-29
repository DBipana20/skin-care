import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updateSkinType,
  addConcern,
  removeConcern,
  updateReminders
} from '../controllers/authUserController.js';

const router = express.Router();

router.get('/', getUserProfile);
router.put('/', updateUserProfile);
router.put('/skintype', updateSkinType);
router.post('/concerns', addConcern);
router.delete('/concerns/:concern', removeConcern);
router.put('/reminders', updateReminders);

export default router;
