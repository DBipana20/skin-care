import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function DailyCare() {
  const location = useLocation();
  const initialTab = location.state?.tab === 'evening' ? 'evening' : 'morning';
  const [activeTab, setActiveTab] = useState(initialTab);

  const {
    morningSteps,
    toggleMorningStep,
    eveningSteps,
    toggleEveningStep,
    morningDoneCount,
    morningTotalCount,
    eveningDoneCount,
    eveningTotalCount
  } = useApp();

  const isMorning = activeTab === 'morning';
  const steps = isMorning ? morningSteps : eveningSteps;
  const toggleStep = isMorning ? toggleMorningStep : toggleEveningStep;
  const doneCount = isMorning ? morningDoneCount : eveningDoneCount;
  const totalCount = isMorning ? morningTotalCount : eveningTotalCount;
  const progressPercent = Math.round((doneCount / totalCount) * 100);

  return (
    <div className="max-w-[1140px] mx-auto px-margin-mobile md:px-margin-desktop pt-sm pb-32">
      {/* Page Title & Routine Selector Tabs */}
      <section className="mb-lg">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-md">
          Daily Care
        </h1>
        <div className="flex gap-sm p-xs bg-surface-container-high rounded-full w-full max-w-[320px]">
          <button
            onClick={() => setActiveTab('morning')}
            className={`flex-1 py-2 font-label-md text-label-md rounded-full transition-all text-center flex items-center justify-center gap-1.5 ${
              isMorning
                ? 'bg-surface-container-lowest text-on-surface ambient-shadow font-semibold'
                : 'text-on-surface-variant/60 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
            Morning
          </button>
          <button
            onClick={() => setActiveTab('evening')}
            className={`flex-1 py-2 font-label-md text-label-md rounded-full transition-all text-center flex items-center justify-center gap-1.5 ${
              !isMorning
                ? 'bg-surface-container-lowest text-on-surface ambient-shadow font-semibold'
                : 'text-on-surface-variant/60 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">dark_mode</span>
            Evening
          </button>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="mb-lg bg-surface-container-lowest rounded-[24px] p-md md:p-lg ambient-shadow">
        <div className="flex justify-between items-end mb-sm">
          <div>
            <span className="font-body-lg text-body-lg text-on-surface font-semibold">
              {isMorning ? 'Morning Regimen' : 'Evening Regimen'}
            </span>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              {doneCount === totalCount
                ? 'Complete! Great job taking care of your skin today.'
                : `${totalCount - doneCount} step${totalCount - doneCount > 1 ? 's' : ''} remaining`}
            </p>
          </div>
          <span className="font-label-md text-label-md text-secondary font-bold bg-secondary-container/30 px-3 py-1 rounded-full">
            {doneCount}/{totalCount} Done ({progressPercent}%)
          </span>
        </div>
        <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isMorning ? 'bg-secondary' : 'bg-primary'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* Checklist Cards */}
      <section className="flex flex-col gap-sm">
        {steps.map((item, index) => {
          const isDone = item.completed;
          return (
            <div
              key={item.id}
              onClick={() => toggleStep(item.id)}
              className={`bg-surface-container-lowest rounded-lg p-md flex items-center gap-md ambient-shadow cursor-pointer transition-all duration-200 relative overflow-hidden group border ${
                isDone
                  ? 'border-secondary/30 bg-surface-bright/70'
                  : 'border-transparent hover:border-surface-variant hover:bg-surface-bright'
              }`}
            >
              {/* Left Accent Bar */}
              <div
                className={`absolute inset-y-0 left-0 w-1.5 transition-all duration-300 ${
                  isDone
                    ? isMorning ? 'bg-secondary opacity-100' : 'bg-primary opacity-100'
                    : 'bg-secondary opacity-0 group-hover:opacity-30'
                }`}
              />

              {/* Step Number & Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isDone
                    ? isMorning
                      ? 'bg-secondary/15 text-secondary'
                      : 'bg-primary/15 text-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: `'FILL' ${isDone ? 1 : 0}` }}
                >
                  {item.icon}
                </span>
              </div>

              {/* Step Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant/70">
                    Step {index + 1} • {item.step}
                  </span>
                </div>
                <h3
                  className={`font-body-lg text-body-lg font-semibold transition-all truncate ${
                    isDone ? 'line-through text-on-surface-variant/60' : 'text-on-surface'
                  }`}
                >
                  {item.product}
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant/80 mt-xs">
                  {item.tip}
                </p>
              </div>

              {/* Circular Toggle Checkbox Button */}
              <button
                type="button"
                aria-label={`Mark step ${item.step} as ${isDone ? 'incomplete' : 'complete'}`}
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90 ${
                  isDone
                    ? isMorning
                      ? 'bg-secondary border-2 border-secondary text-on-secondary shadow-sm'
                      : 'bg-primary border-2 border-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-lowest border-2 border-outline-variant text-transparent hover:border-secondary'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ opacity: isDone ? 1 : 0 }}
                >
                  check
                </span>
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}
