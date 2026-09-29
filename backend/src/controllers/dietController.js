import { db } from '../db/database.js';

export const getDiet = async (req, res, next) => {
  try {
    const skinLovingFoods = db.get('skinLovingFoods') || [];
    const watchOutFoods = db.get('watchOutFoods') || [];

    res.json({
      success: true,
      data: {
        skinLovingFoods,
        watchOutFoods
      }
    });
  } catch (error) {
    next(error);
  }
};

export const addFood = async (req, res, next) => {
  try {
    const { name, category } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Food name is required' });
    }

    const trimmed = name.trim();
    const isLoving = category === 'loving';
    const key = isLoving ? 'skinLovingFoods' : 'watchOutFoods';

    let list = db.get(key) || [];

    if (!list.includes(trimmed)) {
      list = [...list, trimmed];
      await db.set(key, list);
    }

    const skinLovingFoods = db.get('skinLovingFoods') || [];
    const watchOutFoods = db.get('watchOutFoods') || [];

    res.status(201).json({
      success: true,
      message: `Added '${trimmed}' to ${isLoving ? 'Skin Loving' : 'Watch Out'} list`,
      data: {
        skinLovingFoods,
        watchOutFoods
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    const { category, name } = req.params;
    const decodedName = decodeURIComponent(name);
    const isLoving = category === 'loving';
    const key = isLoving ? 'skinLovingFoods' : 'watchOutFoods';

    let list = db.get(key) || [];
    list = list.filter(item => item !== decodedName);

    await db.set(key, list);

    const skinLovingFoods = db.get('skinLovingFoods') || [];
    const watchOutFoods = db.get('watchOutFoods') || [];

    res.json({
      success: true,
      message: `Removed '${decodedName}'`,
      data: {
        skinLovingFoods,
        watchOutFoods
      }
    });
  } catch (error) {
    next(error);
  }
};
