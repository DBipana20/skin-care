import { db } from '../db/database.js';

const calculateStats = (morningSteps, eveningSteps) => {
  const morningDoneCount = morningSteps.filter(s => s.completed).length;
  const morningTotalCount = morningSteps.length;
  const eveningDoneCount = eveningSteps.filter(s => s.completed).length;
  const eveningTotalCount = eveningSteps.length;
  const totalSteps = morningTotalCount + eveningTotalCount;
  const completedSteps = morningDoneCount + eveningDoneCount;
  const overallPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return {
    morningDoneCount,
    morningTotalCount,
    eveningDoneCount,
    eveningTotalCount,
    overallPercentage
  };
};

export const getRoutines = async (req, res, next) => {
  try {
    const morningSteps = db.get('morningSteps') || [];
    const eveningSteps = db.get('eveningSteps') || [];
    const stats = calculateStats(morningSteps, eveningSteps);

    res.json({
      success: true,
      data: {
        morningSteps,
        eveningSteps,
        ...stats
      }
    });
  } catch (error) {
    next(error);
  }
};

export const toggleRoutineStep = async (req, res, next) => {
  try {
    const { type, id } = req.params; // type: 'morning' or 'evening', id: number
    const stepId = parseInt(id, 10);
    const key = type === 'morning' ? 'morningSteps' : 'eveningSteps';

    let steps = db.get(key) || [];
    let updatedStep = null;

    steps = steps.map(s => {
      if (s.id === stepId) {
        updatedStep = { ...s, completed: !s.completed };
        return updatedStep;
      }
      return s;
    });

    if (!updatedStep) {
      return res.status(404).json({ success: false, message: `Step with id ${stepId} not found in ${type} routine` });
    }

    await db.set(key, steps);

    const morningSteps = db.get('morningSteps') || [];
    const eveningSteps = db.get('eveningSteps') || [];
    const stats = calculateStats(morningSteps, eveningSteps);

    res.json({
      success: true,
      message: `Step '${updatedStep.step}' updated to ${updatedStep.completed ? 'completed' : 'incomplete'}`,
      data: {
        step: updatedStep,
        [key]: steps,
        ...stats
      }
    });
  } catch (error) {
    next(error);
  }
};

export const addRoutineStep = async (req, res, next) => {
  try {
    const { type } = req.params; // 'morning' | 'evening'
    const { step, product, tip, icon } = req.body;

    if (!step || !product) {
      return res.status(400).json({ success: false, message: 'step and product are required' });
    }

    const key = type === 'morning' ? 'morningSteps' : 'eveningSteps';
    const steps = db.get(key) || [];

    const newId = steps.length > 0 ? Math.max(...steps.map(s => s.id)) + 1 : 1;
    const newStep = {
      id: newId,
      step: step.trim(),
      product: product.trim(),
      tip: tip ? tip.trim() : '',
      icon: icon || 'spa',
      completed: false
    };

    const updatedSteps = [...steps, newStep];
    await db.set(key, updatedSteps);

    const morningSteps = db.get('morningSteps') || [];
    const eveningSteps = db.get('eveningSteps') || [];
    const stats = calculateStats(morningSteps, eveningSteps);

    res.status(201).json({
      success: true,
      message: 'Routine step added',
      data: {
        newStep,
        [key]: updatedSteps,
        ...stats
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoutineStep = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const stepId = parseInt(id, 10);
    const key = type === 'morning' ? 'morningSteps' : 'eveningSteps';

    let steps = db.get(key) || [];
    const initialLength = steps.length;
    steps = steps.filter(s => s.id !== stepId);

    if (steps.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Step not found' });
    }

    await db.set(key, steps);

    const morningSteps = db.get('morningSteps') || [];
    const eveningSteps = db.get('eveningSteps') || [];
    const stats = calculateStats(morningSteps, eveningSteps);

    res.json({
      success: true,
      message: 'Step removed',
      data: {
        [key]: steps,
        ...stats
      }
    });
  } catch (error) {
    next(error);
  }
};
