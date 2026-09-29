import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AppContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: "Gentle Milky Cleanser",
    subtitle: "Oat Extract & Ceramides",
    category: "Cleansers",
    skinTypeTag: "Dry Skin",
    rating: 4.8,
    isFavorite: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnPPbbT-Yawdt0arTSrHqloWiCCFZbyBc4x4Wr2KClNF4IyxGngKN59iOey-IOUpV_cB-Q92qKbMPYCiioIoadZEyISjoN4-8Yjk_nBeVGw0BLcmKy9x-rmqnG8KtHZzPxK-oaPBxNk4FcmdHtutpxB56ymnF_UMm9yrd9iG3lscnnlAdgcBtfK7htIrjZZwKzrnS7F7glXpi87vmsgZj98hE0UljInI6mk-U2bi3c4rfYCKdD7GzjAg",
    alt: "Gentle Milky Cleanser frosted bottle"
  },
  {
    id: 2,
    name: "Calming Cica Serum",
    subtitle: "Centella Asiatica & Panthenol",
    category: "Serums",
    skinTypeTag: "Sensitive",
    rating: 4.9,
    isFavorite: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6uWQi3Baq6uSyLoYnKkoaXk1I5njXmDmo2esCM4Y6VuBpelOcOlKJbjezPTJo1LSrOrEynjhe2jIHBQ9DYx4EYyJXffPBjsEN06aR1Pbcz754waRuwuT23kE9qMySd8gGewa4DXBlclKaOaDtLlLVHl0b1soKd2ljcIQlec1GHgiX8HJ6Qum9u6gmU6mq98o_TEJUjVArOcsDKT0lrWPh9qwJj2jSiSz195OBtx0NlyvbrI_JA8bM6Q",
    alt: "Calming Cica Serum dropper bottle"
  },
  {
    id: 3,
    name: "Daily Barrier Cream",
    subtitle: "Hyaluronic Acid & Peptides",
    category: "Moisturizers",
    skinTypeTag: "All Skin Types",
    rating: 4.7,
    isFavorite: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7mfE-4VLpPqTc8evIaVu_04vi3CbADxx6780dZGY6jBvAhpPuCMGZRbDenkLPva4d06_yYy66iZo5t2phUooQH7G10m37Pqc2x1n97Y7zYXTVtcis26sfMVkMAymijbMcyHL3g2PeUfhUxHPCOGEqC9VOoT1WFk2cvbfBXJaorVpAahB2rqMcgHN-aUnQUnRqoZJfFPR4j2yjvzBengbofCgoYMP4ivkjuPwUm563TnNmxf8eA6qqow",
    alt: "Daily Barrier Cream minimalist jar"
  },
  {
    id: 4,
    name: "Purifying Gel Cleanser",
    subtitle: "BHA & Green Tea",
    category: "Cleansers",
    skinTypeTag: "Oily Skin",
    rating: 4.6,
    isFavorite: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA0v_dd5d4KGd-EhlVBJFnhzWWzTR3WgDPiEN0VeaqV4UKE6F-WxCX1WGp2FYDZlffuDoiXZoXnjFzAdQB2eKxlc9gjAxhZgsC2NBXZ8dk2-EJR16MaGgIHJc32odnlAhFn6ZGLBO27ZNdvkbzBrNpE8n3NUHpUMi434ss7mGw4Bh6xW6ySU4YaGWOxfIiUiuhc9lrPOMqDQRMbzXTjHD8IB3eKi0EDEY7rrQQYvFwJTwB8yZuKTVx-g",
    alt: "Purifying Gel Cleanser bottle"
  },
  {
    id: 5,
    name: "Sheer Defense Sunscreen SPF 50+",
    subtitle: "Zinc Oxide & Niacinamide",
    category: "Sunscreens",
    skinTypeTag: "All Skin Types",
    rating: 4.9,
    isFavorite: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnPPbbT-Yawdt0arTSrHqloWiCCFZbyBc4x4Wr2KClNF4IyxGngKN59iOey-IOUpV_cB-Q92qKbMPYCiioIoadZEyISjoN4-8Yjk_nBeVGw0BLcmKy9x-rmqnG8KtHZzPxK-oaPBxNk4FcmdHtutpxB56ymnF_UMm9yrd9iG3lscnnlAdgcBtfK7htIrjZZwKzrnS7F7glXpi87vmsgZj98hE0UljInI6mk-U2bi3c4rfYCKdD7GzjAg",
    alt: "Sheer Defense SPF 50 tube"
  },
  {
    id: 6,
    name: "Bakuchiol Retinol Alternative",
    subtitle: "Plant-derived smoothing elixir",
    category: "Serums",
    skinTypeTag: "Sensitive",
    rating: 4.8,
    isFavorite: false,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6uWQi3Baq6uSyLoYnKkoaXk1I5njXmDmo2esCM4Y6VuBpelOcOlKJbjezPTJo1LSrOrEynjhe2jIHBQ9DYx4EYyJXffPBjsEN06aR1Pbcz754waRuwuT23kE9qMySd8gGewa4DXBlclKaOaDtLlLVHl0b1soKd2ljcIQlec1GHgiX8HJ6Qum9u6gmU6mq98o_TEJUjVArOcsDKT0lrWPh9qwJj2jSiSz195OBtx0NlyvbrI_JA8bM6Q",
    alt: "Bakuchiol serum dropper bottle"
  }
];

export function AppProvider({ children }) {
  // Backend Connection Status
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Skin Type State (from Onboarding or Profile)
  const [skinType, setSkinTypeState] = useState(() => {
    return localStorage.getItem('gt_skintype') || 'Sensitive';
  });

  // User Profile
  const [user, setUserState] = useState(() => {
    const saved = localStorage.getItem('gt_user');
    return saved ? JSON.parse(saved) : {
      name: "Elena Rostova",
      email: "elena.rostova@example.com",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5GrDL4N_6WwLfHYv2gAsaOEwItBo2Pc8_8t_zmGhh2204gF-5HS2feOwRTZM89xWN56iAsnEPCm8T88T4BH_RNNXg0W6VRxPg8uM8Ra1c0Akg_bXGRIl3myMTgBhq7CGQ8bhPgKHur36TQG7_L2Ief4BcZ0swtKdm1v2shnO6cOB-iMheCHjXcGUJfUjysXn2yKnUuO1bgrH3S885FO-_CMosL4MRbNOYPs8WosHHq0Cab2_tc0fWaw"
    };
  });

  // Skin Concerns
  const [concerns, setConcernsState] = useState(() => {
    const saved = localStorage.getItem('gt_concerns');
    return saved ? JSON.parse(saved) : ['Rosacea-Prone', 'Combination'];
  });

  // Reminders Setting
  const [reminders, setRemindersState] = useState(() => {
    const saved = localStorage.getItem('gt_reminders');
    return saved ? JSON.parse(saved) : {
      enabled: true,
      morningTime: "8:00 AM",
      eveningTime: "9:30 PM"
    };
  });

  // Streaks
  const [streakDays, setStreakDays] = useState(12);
  const [longestStreak, setLongestStreak] = useState(24);

  // Hydration Glasses (0 to 8)
  const [waterGlasses, setWaterGlassesState] = useState(() => {
    const saved = localStorage.getItem('gt_water');
    return saved !== null ? parseInt(saved, 10) : 5;
  });

  // Morning Routine Checklist
  const [morningSteps, setMorningSteps] = useState(() => {
    const saved = localStorage.getItem('gt_morning_steps');
    return saved ? JSON.parse(saved) : [
      { id: 1, step: "Cleanse", product: "Gentle Foaming Cleanser", tip: "Use lukewarm water", icon: "water_drop", completed: true },
      { id: 2, step: "Tone", product: "Balancing Rose Toner", tip: "Pat gently into skin", icon: "lens_blur", completed: false },
      { id: 3, step: "Treat", product: "Vitamin C Brightening Serum", tip: "2-3 drops is enough", icon: "science", completed: false },
      { id: 4, step: "Moisturize", product: "Hydrating Cloud Cream", tip: "Massage upwards", icon: "spa", completed: false },
      { id: 5, step: "Protect", product: "Sheer Defense SPF 50", tip: "Don't forget your neck", icon: "light_mode", completed: false }
    ];
  });

  // Evening Routine Checklist
  const [eveningSteps, setEveningSteps] = useState(() => {
    const saved = localStorage.getItem('gt_evening_steps');
    return saved ? JSON.parse(saved) : [
      { id: 1, step: "Melt", product: "Soothing Cleansing Balm", tip: "Dissolve SPF & makeup", icon: "water_drop", completed: true },
      { id: 2, step: "Cleanse", product: "Gentle Foaming Cleanser", tip: "Wash away leftover residue", icon: "bubble_chart", completed: true },
      { id: 3, step: "Clarify", product: "BHA Clarifying Solution", tip: "Pat gently, 2-3x weekly", icon: "lens_blur", completed: true },
      { id: 4, step: "Treat", product: "Retinol Renewal Elixir", tip: "Apply to dry skin only", icon: "science", completed: true },
      { id: 5, step: "Nourish", product: "Deep Recovery Barrier Balm", tip: "Locks in nightly moisture", icon: "spa", completed: true },
      { id: 6, step: "Eyes", product: "Peptide Smoothing Balm", tip: "Gently tap with ring finger", icon: "visibility", completed: false },
      { id: 7, step: "Lips", product: "Ceramide Overnight Glaze", tip: "Apply generous layer before sleep", icon: "face", completed: false }
    ];
  });

  // Food Log
  const [skinLovingFoods, setSkinLovingFoods] = useState(() => {
    const saved = localStorage.getItem('gt_skin_loving');
    return saved ? JSON.parse(saved) : ['Avocado', 'Green Tea', 'Walnuts'];
  });

  const [watchOutFoods, setWatchOutFoods] = useState(() => {
    const saved = localStorage.getItem('gt_watch_out');
    return saved ? JSON.parse(saved) : ['Dairy', 'Refined Sugar'];
  });

  // Products
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('gt_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Fetch initial data from backend API on mount
  useEffect(() => {
    let isMounted = true;
    api.getBootstrapData()
      .then((res) => {
        if (!isMounted || !res || !res.data) return;
        const data = res.data;
        if (data.user) setUserState(data.user);
        if (data.skinType) setSkinTypeState(data.skinType);
        if (data.concerns) setConcernsState(data.concerns);
        if (data.reminders) setRemindersState(data.reminders);
        if (typeof data.waterGlasses === 'number') setWaterGlassesState(data.waterGlasses);
        if (data.morningSteps) setMorningSteps(data.morningSteps);
        if (data.eveningSteps) setEveningSteps(data.eveningSteps);
        if (data.skinLovingFoods) setSkinLovingFoods(data.skinLovingFoods);
        if (data.watchOutFoods) setWatchOutFoods(data.watchOutFoods);
        if (data.products) setProducts(data.products);
        if (typeof data.streakDays === 'number') setStreakDays(data.streakDays);
        if (typeof data.longestStreak === 'number') setLongestStreak(data.longestStreak);
        setIsBackendConnected(true);
        console.log('[GlowTrack] Connected to backend API successfully.');
      })
      .catch((err) => {
        console.log('[GlowTrack] Backend API unavailable, continuing with local state cache.', err.message);
      });

    return () => { isMounted = false; };
  }, []);

  // Sync to local storage as resilient offline cache
  useEffect(() => { localStorage.setItem('gt_skintype', skinType); }, [skinType]);
  useEffect(() => { localStorage.setItem('gt_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('gt_concerns', JSON.stringify(concerns)); }, [concerns]);
  useEffect(() => { localStorage.setItem('gt_reminders', JSON.stringify(reminders)); }, [reminders]);
  useEffect(() => { localStorage.setItem('gt_water', waterGlasses.toString()); }, [waterGlasses]);
  useEffect(() => { localStorage.setItem('gt_morning_steps', JSON.stringify(morningSteps)); }, [morningSteps]);
  useEffect(() => { localStorage.setItem('gt_evening_steps', JSON.stringify(eveningSteps)); }, [eveningSteps]);
  useEffect(() => { localStorage.setItem('gt_skin_loving', JSON.stringify(skinLovingFoods)); }, [skinLovingFoods]);
  useEffect(() => { localStorage.setItem('gt_watch_out', JSON.stringify(watchOutFoods)); }, [watchOutFoods]);
  useEffect(() => { localStorage.setItem('gt_products', JSON.stringify(products)); }, [products]);

  // Actions with Optimistic UI & Backend Sync
  const setSkinType = useCallback((type) => {
    setSkinTypeState(type);
    api.updateSkinType(type).catch(() => {});
  }, []);

  const setUser = useCallback((updatedUser) => {
    setUserState(updatedUser);
    api.updateUserProfile(updatedUser).catch(() => {});
  }, []);

  const setReminders = useCallback((updater) => {
    setRemindersState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      api.updateReminders(next).catch(() => {});
      return next;
    });
  }, []);

  const toggleMorningStep = useCallback((id) => {
    setMorningSteps(prev => prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
    api.toggleRoutineStep('morning', id).catch(() => {});
  }, []);

  const toggleEveningStep = useCallback((id) => {
    setEveningSteps(prev => prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
    api.toggleRoutineStep('evening', id).catch(() => {});
  }, []);

  const toggleWaterGlass = useCallback((index) => {
    setWaterGlassesState(prev => {
      const next = index < prev ? index : index + 1;
      api.updateHydration(next).catch(() => {});
      return next;
    });
  }, []);

  const toggleProductFavorite = useCallback((id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
    api.toggleProductFavorite(id).catch(() => {});
  }, []);

  const addConcern = useCallback((concern) => {
    if (concern && !concerns.includes(concern)) {
      setConcernsState(prev => [...prev, concern]);
      api.addConcern(concern).catch(() => {});
    }
  }, [concerns]);

  const removeConcern = useCallback((concern) => {
    setConcernsState(prev => prev.filter(c => c !== concern));
    api.removeConcern(concern).catch(() => {});
  }, []);

  const addFoodEntry = useCallback((name, type) => {
    if (!name.trim()) return;
    const trimmed = name.trim();
    if (type === 'loving') {
      setSkinLovingFoods(prev => prev.includes(trimmed) ? prev : [...prev, trimmed]);
    } else {
      setWatchOutFoods(prev => prev.includes(trimmed) ? prev : [...prev, trimmed]);
    }
    api.addFood(trimmed, type).catch(() => {});
  }, []);

  // Calculated overall percentage
  const totalSteps = morningSteps.length + eveningSteps.length;
  const completedSteps = morningSteps.filter(s => s.completed).length + eveningSteps.filter(s => s.completed).length;
  const overallPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <AppContext.Provider value={{
      isBackendConnected,
      skinType,
      setSkinType,
      user,
      setUser,
      concerns,
      addConcern,
      removeConcern,
      reminders,
      setReminders,
      streakDays,
      setStreakDays,
      longestStreak,
      waterGlasses,
      setWaterGlasses: setWaterGlassesState,
      toggleWaterGlass,
      morningSteps,
      toggleMorningStep,
      eveningSteps,
      toggleEveningStep,
      skinLovingFoods,
      watchOutFoods,
      addFoodEntry,
      products,
      toggleProductFavorite,
      overallPercentage,
      morningDoneCount: morningSteps.filter(s => s.completed).length,
      morningTotalCount: morningSteps.length,
      eveningDoneCount: eveningSteps.filter(s => s.completed).length,
      eveningTotalCount: eveningSteps.length
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
