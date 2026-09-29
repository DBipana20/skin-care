import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function HomeDashboard() {
  const {
    user,
    streakDays,
    overallPercentage,
    morningDoneCount,
    morningTotalCount,
    eveningDoneCount,
    eveningTotalCount
  } = useApp();

  // Progress circle SVG calculation
  // Radius = 54, Circumference = 2 * PI * 54 = 339.292
  const circumference = 339.292;
  const strokeDashoffset = circumference - (overallPercentage / 100) * circumference;

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="max-w-[1140px] mx-auto px-margin-mobile md:px-margin-desktop pt-md md:pt-lg pb-32">
      {/* Header Greeting Section */}
      <section className="mb-lg flex flex-col gap-xs">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Good morning, {user.name.split(' ')[0]}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {todayFormatted}
        </p>
      </section>

      {/* Bento Grid Top Row: Progress & Streak */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-xl">
        {/* Progress Card */}
        <article className="bg-surface-container-lowest rounded-[24px] p-lg soft-shadow flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-ambient transition-all">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              {/* Background Circle */}
              <circle
                className="stroke-surface-container-high"
                cx="60"
                cy="60"
                fill="none"
                r="54"
                strokeWidth="8"
              />
              {/* Animated Progress Circle */}
              <circle
                className="stroke-secondary progress-ring__circle"
                cx="60"
                cy="60"
                fill="none"
                r="54"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-display text-display text-on-surface leading-tight">
                {overallPercentage}%
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-xs">
                Complete
              </span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-sm text-center">
            {overallPercentage === 100
              ? 'Incredible! You completed all daily skincare rituals!'
              : "You're almost there! Just a few more steps."}
          </p>
          <Link
            to="/routine"
            className="mt-4 text-primary font-label-md text-label-md hover:underline flex items-center gap-1"
          >
            Update routine <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </article>

        {/* Streak Card */}
        <article className="bg-tertiary-container/30 rounded-[24px] p-lg soft-shadow flex flex-col justify-center items-start relative overflow-hidden group hover:shadow-ambient transition-all">
          {/* Abstract Background Graphic element */}
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-50 pointer-events-none transition-transform group-hover:scale-110" />

          <div className="flex items-center gap-sm mb-sm bg-surface-container-lowest/60 backdrop-blur-md px-4 py-2 rounded-full border border-surface-container-lowest">
            <span
              className="material-symbols-outlined text-tertiary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              Consistency
            </span>
          </div>

          <h2 className="font-display text-display text-on-surface mt-xs leading-none">
            {streakDays} Day
          </h2>
          <h3 className="font-headline-md text-headline-md text-tertiary">
            Streak
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-sm relative z-10 max-w-[80%]">
            Your skin is thanking you. Keep the momentum going!
          </p>

          <Link
            to="/progress"
            className="mt-4 text-tertiary font-label-md text-label-md hover:underline flex items-center gap-1 relative z-10"
          >
            View consistency heatmap <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </article>
      </div>

      {/* Quick Access Section */}
      <section className="mb-lg">
        <div className="flex items-center justify-between mb-md">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Quick Access
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm">
          {/* Morning Routine */}
          <Link
            to="/routine"
            className="bg-surface-container-lowest rounded-[24px] p-md soft-shadow flex items-center gap-md hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-secondary-container/50"
          >
            <div className="w-14 h-14 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300 shrink-0">
              <span className="material-symbols-outlined text-[28px]">wb_sunny</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Morning Routine
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {morningDoneCount}/{morningTotalCount} Done
              </span>
            </div>
          </Link>

          {/* Evening Routine */}
          <Link
            to="/routine"
            state={{ tab: 'evening' }}
            className="bg-surface-container-lowest rounded-[24px] p-md soft-shadow flex items-center gap-md hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-primary-container/50"
          >
            <div className="w-14 h-14 rounded-full bg-primary-container/40 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
              <span className="material-symbols-outlined text-[28px]">dark_mode</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Evening Routine
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {eveningDoneCount}/{eveningTotalCount} Done
              </span>
            </div>
          </Link>

          {/* Diet Log */}
          <Link
            to="/hydration"
            className="bg-surface-container-lowest rounded-[24px] p-md soft-shadow flex items-center gap-md hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-surface-container-high"
          >
            <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:scale-110 transition-transform duration-300 shrink-0">
              <span className="material-symbols-outlined text-[28px]">restaurant</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Diet Log
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Track hydration & nutrition
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
