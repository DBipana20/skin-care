import { db } from '../db/database.js';

export const getHydration = async (req, res, next) => {
  try {
    const waterGlasses = db.get('waterGlasses') ?? 5;
    res.json({
      success: true,
      data: {
        waterGlasses,
        target: 8,
        percentage: Math.round((waterGlasses / 8) * 100)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateHydration = async (req, res, next) => {
  try {
    const { waterGlasses } = req.body;
    const count = parseInt(waterGlasses, 10);

    if (isNaN(count) || count < 0 || count > 8) {
      return res.status(400).json({
        success: false,
        message: 'waterGlasses must be a number between 0 and 8'
      });
    }

    await db.set('waterGlasses', count);

    res.json({
      success: true,
      message: 'Hydration updated',
      data: {
        waterGlasses: count,
        target: 8,
        percentage: Math.round((count / 8) * 100)
      }
    });
  } catch (error) {
    next(error);
  }
};
