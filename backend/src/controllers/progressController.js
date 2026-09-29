import { db } from '../db/database.js';

export const getProgress = async (req, res, next) => {
  try {
    const streakDays = db.get('streakDays') ?? 12;
    const longestStreak = db.get('longestStreak') ?? 24;
    const heatmapDays = db.get('heatmapDays') || [];

    res.json({
      success: true,
      data: {
        streakDays,
        longestStreak,
        heatmapDays
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateStreaks = async (req, res, next) => {
  try {
    const { streakDays, longestStreak } = req.body;

    if (typeof streakDays === 'number') {
      await db.set('streakDays', streakDays);
    }
    if (typeof longestStreak === 'number') {
      await db.set('longestStreak', longestStreak);
    }

    res.json({
      success: true,
      message: 'Streaks updated',
      data: {
        streakDays: db.get('streakDays'),
        longestStreak: db.get('longestStreak')
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getBootstrapData = async (req, res, next) => {
  try {
    const user = db.get('user');
    const skinType = db.get('skinType');
    const concerns = db.get('concerns') || [];
    const reminders = db.get('reminders');
    const streakDays = db.get('streakDays') ?? 12;
    const longestStreak = db.get('longestStreak') ?? 24;
    const waterGlasses = db.get('waterGlasses') ?? 5;
    const morningSteps = db.get('morningSteps') || [];
    const eveningSteps = db.get('eveningSteps') || [];
    const skinLovingFoods = db.get('skinLovingFoods') || [];
    const watchOutFoods = db.get('watchOutFoods') || [];
    const products = db.get('products') || [];
    const heatmapDays = db.get('heatmapDays') || [];

    const morningDoneCount = morningSteps.filter(s => s.completed).length;
    const morningTotalCount = morningSteps.length;
    const eveningDoneCount = eveningSteps.filter(s => s.completed).length;
    const eveningTotalCount = eveningSteps.length;
    const totalSteps = morningTotalCount + eveningTotalCount;
    const completedSteps = morningDoneCount + eveningDoneCount;
    const overallPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

    res.json({
      success: true,
      data: {
        user,
        skinType,
        concerns,
        reminders,
        streakDays,
        longestStreak,
        waterGlasses,
        morningSteps,
        eveningSteps,
        skinLovingFoods,
        watchOutFoods,
        products,
        heatmapDays,
        stats: {
          morningDoneCount,
          morningTotalCount,
          eveningDoneCount,
          eveningTotalCount,
          overallPercentage
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
