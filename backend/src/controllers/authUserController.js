import { db } from '../db/database.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const user = db.get('user');
    const skinType = db.get('skinType');
    const concerns = db.get('concerns') || [];
    const reminders = db.get('reminders');

    res.json({
      success: true,
      data: {
        user,
        skinType,
        concerns,
        reminders
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    const currentUser = db.get('user') || {};

    const updatedUser = {
      ...currentUser,
      ...(name !== undefined && { name: name.trim() }),
      ...(email !== undefined && { email: email.trim() }),
      ...(avatar !== undefined && { avatar: avatar.trim() })
    };

    await db.set('user', updatedUser);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

export const updateSkinType = async (req, res, next) => {
  try {
    const { skinType } = req.body;
    if (!skinType) {
      return res.status(400).json({ success: false, message: 'skinType is required' });
    }

    await db.set('skinType', skinType);

    res.json({
      success: true,
      message: 'Skin type updated successfully',
      data: { skinType }
    });
  } catch (error) {
    next(error);
  }
};

export const addConcern = async (req, res, next) => {
  try {
    const { concern } = req.body;
    if (!concern || !concern.trim()) {
      return res.status(400).json({ success: false, message: 'concern is required' });
    }

    const trimmed = concern.trim();
    let concerns = db.get('concerns') || [];

    if (!concerns.includes(trimmed)) {
      concerns = [...concerns, trimmed];
      await db.set('concerns', concerns);
    }

    res.status(201).json({
      success: true,
      message: 'Concern added',
      data: concerns
    });
  } catch (error) {
    next(error);
  }
};

export const removeConcern = async (req, res, next) => {
  try {
    const { concern } = req.params;
    const decodedConcern = decodeURIComponent(concern);
    const concerns = (db.get('concerns') || []).filter(c => c !== decodedConcern);

    await db.set('concerns', concerns);

    res.json({
      success: true,
      message: 'Concern removed',
      data: concerns
    });
  } catch (error) {
    next(error);
  }
};

export const updateReminders = async (req, res, next) => {
  try {
    const { enabled, morningTime, eveningTime } = req.body;
    const currentReminders = db.get('reminders') || {};

    const updated = {
      ...currentReminders,
      ...(enabled !== undefined && { enabled: Boolean(enabled) }),
      ...(morningTime !== undefined && { morningTime: morningTime.trim() }),
      ...(eveningTime !== undefined && { eveningTime: eveningTime.trim() })
    };

    await db.set('reminders', updated);

    res.json({
      success: true,
      message: 'Reminders updated',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
