import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Suppress top bar navigation on onboarding page per design rules
  const isOnboarding = location.pathname === '/onboarding';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Routines', path: '/routine' },
    { name: 'Products', path: '/products' },
    { name: 'Hydration', path: '/hydration' },
    { name: 'Consistency', path: '/progress' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <header className="w-full sticky top-0 backdrop-blur-xl bg-surface/80 z-50 transition-all border-b border-surface-container/50">
      <div className="max-w-[1140px] mx-auto flex items-center justify-between px-margin-mobile md:px-margin-desktop py-base md:py-md">
        <div className="flex items-center gap-sm">
          {location.pathname !== '/' && (
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-all text-on-surface-variant active:scale-95"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-headline-md md:text-display text-primary tracking-tight group-hover:opacity-90 transition-opacity">
              GlowTrack
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isOnboarding && (
          <nav className="hidden md:flex items-center gap-lg">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-label-md text-label-md transition-all relative py-1 ${
                    isActive
                      ? 'text-on-surface font-semibold'
                      : 'text-on-surface-variant/60 hover:text-on-surface'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Mobile Profile Icon / Spacer */}
        <div className="flex items-center gap-2 md:hidden">
          {!isOnboarding && location.pathname !== '/profile' && (
            <Link
              to="/profile"
              aria-label="Profile"
              className="w-10 h-10 rounded-full overflow-hidden border border-surface-container-high p-0.5 hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-primary text-2xl flex items-center justify-center w-full h-full">
                account_circle
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
