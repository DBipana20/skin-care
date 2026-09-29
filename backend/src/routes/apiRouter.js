import express from 'express';
import userRoutes from './userRoutes.js';
import routineRoutes from './routineRoutes.js';
import hydrationRoutes from './hydrationRoutes.js';
import dietRoutes from './dietRoutes.js';
import productRoutes from './productRoutes.js';
import progressRoutes from './progressRoutes.js';
import { getBootstrapData } from '../controllers/progressController.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'GlowTrack Skincare API is operational',
    timestamp: new Date().toISOString()
  });
});

// App bootstrap data in a single roundtrip
router.get('/init', getBootstrapData);

// Sub-routers
router.use('/user', userRoutes);
router.use('/routines', routineRoutes);
router.use('/hydration', hydrationRoutes);
router.use('/diet', dietRoutes);
router.use('/products', productRoutes);
router.use('/progress', progressRoutes);

export default router;
