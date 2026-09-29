import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ConsistencyProgress() {
  const { streakDays, longestStreak } = useApp();
  const [selectedDay, setSelectedDay] = useState(25);

  // 31 days of October with intensity levels (0 to 4)
  const heatmapDays = [
    // Week 1 (Starts Wednesday, so Sun/Mon/Tue empty)
    { empty: true }, { empty: true },
    { day: 1, level: 1, routines: '1/2 routines' },
    { day: 2, level: 3, routines: '2/2 routines' },
    { day: 3, level: 2, routines: '2/2 routines' },
    { day: 4, level: 4, routines: '2/2 routines + water' },
    { day: 5, level: 3, routines: '2/2 routines' },
    // Week 2
    { day: 6, level: 1, routines: '1/2 routines' },
    { day: 7, level: 4, routines: '2/2 routines + water' },
    { day: 8, level: 4, routines: '2/2 routines + water' },
    { day: 9, level: 3, routines: '2/2 routines' },
    { day: 10, level: 2, routines: '2/2 routines' },
    { day: 11, level: 4, routines: '2/2 routines + water' },
    { day: 12, level: 3, routines: '2/2 routines' },
    // Week 3
    { day: 13, level: 0, routines: 'Rest day' },
    { day: 14, level: 1, routines: '1/2 routines' },
    { day: 15, level: 2, routines: '2/2 routines' },
    { day: 16, level: 3, routines: '2/2 routines' },
    { day: 17, level: 4, routines: '2/2 routines + water' },
    { day: 18, level: 3, routines: '2/2 routines' },
    { day: 19, level: 4, routines: '2/2 routines + water' },
    // Week 4 & 5
    { day: 20, level: 4, routines: '2/2 routines + water' },
    { day: 21, level: 3, routines: '2/2 routines' },
    { day: 22, level: 4, routines: '2/2 routines + water' },
    { day: 23, level: 3, routines: '2/2 routines' },
    { day: 24, level: 4, routines: '2/2 routines + water' },
    { day: 25, level: 2, routines: "Today: In Progress" },
    { day: 26, level: 0, future: true },
    { day: 27, level: 0, future: true },
    { day: 28, level: 0, future: true },
    { day: 29, level: 0, future: true },
    { day: 30, level: 0, future: true },
    { day: 31, level: 0, future: true },
  ];

  const getLevelColor = (level, future) => {
    if (future) return 'bg-sage-100 opacity-40';
    switch (level) {
      case 0: return 'bg-sage-100';
      case 1: return 'bg-sage-300';
      case 2: return 'bg-sage-500';
      case 3: return 'bg-sage-700';
      case 4: return 'bg-sage-900';
      default: return 'bg-sage-100';
    }
  };

  return (
    <div className="px-margin-mobile md:px-margin-desktop max-w-[1140px] mx-auto mt-lg pb-32 flex flex-col gap-lg">
      {/* Page Header */}
      <section className="flex flex-col gap-xs">
        <h1 className="font-headline-md text-headline-md text-on-surface">
          Monthly Consistency
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Your daily skincare rituals mapped over time.
        </p>
      </section>

      {/* Heatmap Section */}
      <section className="bg-surface-container-lowest rounded-[24px] shadow-ambient p-md md:p-lg flex flex-col gap-md">
        <div className="flex justify-between items-center">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            October 2026
          </h2>
          <div className="flex gap-1.5 items-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant mr-1">
              Less
            </span>
            <div className="w-3.5 h-3.5 rounded-full bg-sage-100" />
            <div className="w-3.5 h-3.5 rounded-full bg-sage-300" />
            <div className="w-3.5 h-3.5 rounded-full bg-sage-500" />
            <div className="w-3.5 h-3.5 rounded-full bg-sage-700" />
            <div className="w-3.5 h-3.5 rounded-full bg-sage-900" />
            <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">
              More
            </span>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-xs text-center font-label-md text-label-md text-on-surface-variant font-semibold">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-7 gap-xs sm:gap-sm">
          {heatmapDays.map((item, index) => {
            if (item.empty) {
              return (
                <div
                  key={`empty-${index}`}
                  className="w-full aspect-square rounded-full bg-transparent"
                />
              );
            }

            const isToday = item.day === 25;
            const isSelected = selectedDay === item.day;

            return (
              <button
                key={item.day}
                type="button"
                onClick={() => setSelectedDay(item.day)}
                title={`Oct ${item.day}: ${item.routines || 'Upcoming'}`}
                className={`w-full aspect-square rounded-full transition-all duration-200 relative group flex items-center justify-center text-[10px] sm:text-xs font-semibold ${
                  getLevelColor(item.level, item.future)
                } ${
                  item.level >= 3 ? 'text-white' : 'text-on-surface-variant'
                } ${
                  isToday
                    ? 'ring-2 ring-primary ring-offset-2 scale-105'
                    : ''
                } ${
                  isSelected ? 'scale-110 shadow-md ring-2 ring-secondary' : 'hover:scale-105'
                }`}
              >
                <span>{item.day}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Day Info Badge */}
        {selectedDay && (
          <div className="mt-2 p-3 bg-surface rounded-full flex items-center justify-between px-4">
            <span className="font-label-md text-label-md text-on-surface">
              October {selectedDay}, 2026
            </span>
            <span className="font-label-sm text-label-sm text-secondary font-bold">
              {heatmapDays.find(d => d.day === selectedDay)?.routines || 'Upcoming day'}
            </span>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
        <div className="bg-surface-container-lowest rounded-[24px] shadow-ambient p-lg flex flex-col items-center justify-center text-center gap-xs">
          <span
            className="material-symbols-outlined text-primary text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Current Streak
          </p>
          <p className="font-display text-display text-on-surface">
            {streakDays}{' '}
            <span className="font-body-md text-body-md text-on-surface-variant font-normal">
              days
            </span>
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] shadow-ambient p-lg flex flex-col items-center justify-center text-center gap-xs">
          <span
            className="material-symbols-outlined text-tertiary text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emoji_events
          </span>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            Longest Streak
          </p>
          <p className="font-display text-display text-on-surface">
            {longestStreak}{' '}
            <span className="font-body-md text-body-md text-on-surface-variant font-normal">
              days
            </span>
          </p>
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="bg-primary-container/20 rounded-[24px] p-lg flex flex-col items-center justify-center text-center gap-sm">
        <span className="material-symbols-outlined text-primary-fixed-dim text-4xl">
          format_quote
        </span>
        <p className="font-body-lg text-body-lg text-on-surface italic max-w-lg">
          "Your skin is a reflection of your consistency."
        </p>
      </section>
    </div>
  );
}
