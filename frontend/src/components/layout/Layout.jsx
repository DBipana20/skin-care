import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-grow w-full">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
