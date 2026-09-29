import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function DietHydration() {
  const {
    waterGlasses,
    toggleWaterGlass,
    skinLovingFoods,
    watchOutFoods,
    addFoodEntry
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFoodName, setNewFoodName] = useState('');
  const [foodCategory, setFoodCategory] = useState('loving');

  const handleAddFood = (e) => {
    e.preventDefault();
    if (newFoodName.trim()) {
      addFoodEntry(newFoodName.trim(), foodCategory);
      setNewFoodName('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-[1140px] mx-auto px-margin-mobile md:px-margin-desktop mt-lg pb-32 space-y-xl">
      {/* Header */}
      <div className="text-center max-w-md mx-auto">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
          Diet &amp; Hydration
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Nourish your skin from within.
        </p>
      </div>

      {/* Section 1: Water Tracker */}
      <section className="bg-surface-container-lowest rounded-lg p-md md:p-lg shadow-ambient relative overflow-hidden max-w-2xl mx-auto">
        {/* Decorative blurred background element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-container rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="flex items-center justify-between mb-md relative z-10">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Daily Hydration
            </h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Target: 2 Liters (8 glasses)
            </p>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full font-medium">
            {waterGlasses} / 8 Glasses
          </span>
        </div>

        {/* 8 Interactive Water Glasses */}
        <div className="flex justify-between items-center relative z-10 py-4 px-2" id="water-tracker">
          {Array.from({ length: 8 }).map((_, index) => {
            const isFilled = index < waterGlasses;
            return (
              <button
                key={index}
                type="button"
                onClick={() => toggleWaterGlass(index)}
                aria-label={`Glass ${index + 1} of 8, ${isFilled ? 'filled' : 'empty'}`}
                className="flex flex-col items-center gap-1 group focus:outline-none transition-transform active:scale-90"
              >
                <span
                  className={`material-symbols-outlined text-3xl md:text-4xl transition-all duration-300 ${
                    isFilled
                      ? 'text-primary scale-110 drop-shadow-sm'
                      : 'text-on-surface-variant/30 group-hover:text-primary/50'
                  }`}
                  style={{
                    fontVariationSettings: `'FILL' ${isFilled ? 1 : 0}`
                  }}
                >
                  {isFilled ? 'water_full' : 'water_drop'}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant/50">
                  {index + 1}
                </span>
              </button>
            );
          })}
        </div>

        <p className="font-label-sm text-label-sm text-on-surface-variant mt-sm text-center">
          Tap a glass to log hydration
        </p>
      </section>

      {/* Section 2: Food Log */}
      <section className="space-y-md max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Food Log
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-container text-on-primary-container font-label-md text-label-md px-4 py-2 rounded-full hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">add</span> Entry
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          {/* Skin Loving Card */}
          <div className="bg-surface-container-lowest rounded-lg p-md shadow-ambient border-l-4 border-secondary">
            <div className="flex items-center gap-xs mb-sm">
              <span
                className="material-symbols-outlined text-secondary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <h3 className="font-body-lg text-body-lg text-on-surface font-semibold">
                Skin Loving
              </h3>
            </div>
            <ul className="space-y-xs">
              {skinLovingFoods.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant"
                >
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Watch Out Card */}
          <div className="bg-surface-container-lowest rounded-lg p-md shadow-ambient border-l-4 border-primary">
            <div className="flex items-center gap-xs mb-sm">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                error
              </span>
              <h3 className="font-body-lg text-body-lg text-on-surface font-semibold">
                Watch Out
              </h3>
            </div>
            <ul className="space-y-xs">
              {watchOutFoods.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant"
                >
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Add Food Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-[24px] p-lg max-w-md w-full shadow-nav space-y-md">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Add Food Entry
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddFood} className="space-y-md">
              <div>
                <label className="font-label-md text-label-md text-on-surface block mb-1">
                  Food or Beverage
                </label>
                <input
                  type="text"
                  required
                  value={newFoodName}
                  onChange={(e) => setNewFoodName(e.target.value)}
                  placeholder="e.g. Blueberries, Oat Milk, etc."
                  className="w-full bg-surface-container-low border border-transparent rounded-full px-4 py-3 font-body-md text-on-surface focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="font-label-md text-label-md text-on-surface block mb-1">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFoodCategory('loving')}
                    className={`py-2 px-3 rounded-full font-label-md text-label-md transition-all border ${
                      foodCategory === 'loving'
                        ? 'bg-secondary-container text-on-secondary-container border-secondary font-semibold'
                        : 'bg-surface border-surface-container text-on-surface-variant'
                    }`}
                  >
                    Skin Loving
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoodCategory('watchout')}
                    className={`py-2 px-3 rounded-full font-label-md text-label-md transition-all border ${
                      foodCategory === 'watchout'
                        ? 'bg-primary-container text-on-primary-container border-primary font-semibold'
                        : 'bg-surface border-surface-container text-on-surface-variant'
                    }`}
                  >
                    Watch Out
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full font-label-md text-label-md bg-primary text-on-primary hover:bg-primary/90"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
