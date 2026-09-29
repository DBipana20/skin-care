import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  // Onboarding has suppressed bottom nav
  if (location.pathname === '/onboarding') {
    return null;
  }

  const navItems = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'Routines', path: '/routine', icon: 'event_upcoming' },
    { label: 'Products', path: '/products', icon: 'sanitizer' },
    { label: 'Hydration', path: '/hydration', icon: 'water_drop' },
    { label: 'Consistency', path: '/progress', icon: 'leaderboard' },
  ];

  return (
    <nav 
      aria-label="Bottom Navigation"
      className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-md z-50 flex justify-around items-center p-sm bg-surface-container-lowest/85 backdrop-blur-xl shadow-nav rounded-full border border-surface-container-low"
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            aria-label={item.label}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 active:scale-90 ${
              isActive
                ? 'bg-primary-container text-on-primary-container shadow-inner'
                : 'text-on-secondary-container/50 hover:bg-secondary-container/20'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
            >
              {item.icon}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
