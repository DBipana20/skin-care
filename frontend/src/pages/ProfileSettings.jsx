import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProfileSettings() {
  const {
    user,
    setUser,
    skinType,
    concerns,
    addConcern,
    removeConcern,
    reminders,
    setReminders
  } = useApp();

  const [isAddConcernOpen, setIsAddConcernOpen] = useState(false);
  const [newConcern, setNewConcern] = useState('');
  const [editingTime, setEditingTime] = useState(null); // 'morning' | 'evening' | null
  const [tempTime, setTempTime] = useState('');

  const handleToggleReminders = () => {
    setReminders(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleAddConcernSubmit = (e) => {
    e.preventDefault();
    if (newConcern.trim()) {
      addConcern(newConcern.trim());
      setNewConcern('');
      setIsAddConcernOpen(false);
    }
  };

  const handleSaveTime = (e) => {
    e.preventDefault();
    if (tempTime) {
      if (editingTime === 'morning') {
        setReminders(prev => ({ ...prev, morningTime: tempTime }));
      } else if (editingTime === 'evening') {
        setReminders(prev => ({ ...prev, eveningTime: tempTime }));
      }
      setEditingTime(null);
    }
  };

  return (
    <div className="flex-grow w-full max-w-[1140px] mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-32 flex flex-col gap-lg">
      {/* Profile Header Section */}
      <section className="flex flex-col items-center justify-center pt-sm pb-md">
        <div className="relative group cursor-pointer mb-sm">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-surface-container-lowest card-shadow relative">
            <img
              src={user.avatar}
              alt="Elena Rostova portrait"
              className="w-full h-full object-cover"
            />
            {/* Edit Overlay */}
            <div className="absolute inset-0 bg-surface-tint/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <span
                className="material-symbols-outlined text-surface-container-lowest text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                edit
              </span>
            </div>
          </div>
        </div>

        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface text-center font-semibold">
          {user.name}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant text-center mt-xs">
          {user.email}
        </p>
      </section>

      {/* Bento Grid for Settings */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-md md:gap-lg w-full">
        {/* Left Column: Personalization & Skin Profile */}
        <div className="col-span-1 md:col-span-7 flex flex-col gap-md">
          {/* Skin Profile Card */}
          <div className="bg-surface-container-lowest rounded-DEFAULT md:rounded-lg p-md card-shadow flex flex-col gap-sm">
            <div className="flex items-center justify-between mb-xs">
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  face_retouching_natural
                </span>
                Skin Profile
              </h2>
            </div>

            <Link
              to="/onboarding"
              className="flex items-center justify-between p-sm bg-surface rounded-DEFAULT cursor-pointer hover:bg-surface-variant transition-colors group"
            >
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Skin Type
                </span>
                <span className="font-body-lg text-body-lg text-on-surface font-semibold">
                  {skinType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-primary-container/50 text-on-primary-container font-label-sm text-label-sm rounded-full">
                  Primary
                </span>
                <span className="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary transition-colors">
                  chevron_right
                </span>
              </div>
            </Link>

            {/* Concerns Tags */}
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant block mb-2">
                Identified Concerns
              </span>
              <div className="flex flex-wrap gap-2">
                {concerns.map((concern) => (
                  <span
                    key={concern}
                    className="px-4 py-2 bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm rounded-full border border-secondary-container/50 flex items-center gap-1.5"
                  >
                    {concern}
                    <button
                      type="button"
                      onClick={() => removeConcern(concern)}
                      aria-label={`Remove ${concern}`}
                      className="hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setIsAddConcernOpen(true)}
                  className="px-4 py-2 bg-surface border border-dashed border-outline-variant text-outline font-label-sm text-label-sm rounded-full hover:bg-surface-variant transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span> Add Concern
                </button>
              </div>
            </div>
          </div>

          {/* Notifications & Reminders Card */}
          <div className="bg-surface-container-lowest rounded-DEFAULT md:rounded-lg p-md card-shadow flex flex-col gap-md">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                notifications_active
              </span>
              Reminders
            </h2>

            {/* Toggle Row */}
            <div className="flex items-center justify-between pb-sm border-b border-surface-variant">
              <div className="flex flex-col">
                <span className="font-body-lg text-body-lg text-on-surface font-medium">
                  Routine Reminders
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Daily push notifications for your regimen
                </span>
              </div>

              {/* Custom Toggle */}
              <button
                type="button"
                onClick={handleToggleReminders}
                aria-label="Toggle reminders"
                className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors duration-200 ease-in-out p-0.5 focus:outline-none ${
                  reminders.enabled ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm ${
                    reminders.enabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
              {/* Morning Time */}
              <div
                onClick={() => {
                  setEditingTime('morning');
                  setTempTime(reminders.morningTime);
                }}
                className="flex flex-col gap-xs p-sm bg-surface rounded-DEFAULT border border-transparent hover:border-primary-container transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    light_mode
                  </span>
                  <span className="font-label-md text-label-md">Morning Routine</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-headline-md text-headline-md text-on-surface font-semibold">
                    {reminders.morningTime}
                  </span>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
                    edit
                  </span>
                </div>
              </div>

              {/* Evening Time */}
              <div
                onClick={() => {
                  setEditingTime('evening');
                  setTempTime(reminders.eveningTime);
                }}
                className="flex flex-col gap-xs p-sm bg-surface rounded-DEFAULT border border-transparent hover:border-primary-container transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    dark_mode
                  </span>
                  <span className="font-label-md text-label-md">Evening Routine</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-headline-md text-headline-md text-on-surface font-semibold">
                    {reminders.eveningTime}
                  </span>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
                    edit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Account & Legal */}
        <div className="col-span-1 md:col-span-5 flex flex-col gap-md">
          {/* Account Actions */}
          <div className="bg-surface-container-lowest rounded-DEFAULT md:rounded-lg p-md card-shadow flex flex-col gap-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                manage_accounts
              </span>
              Account
            </h2>

            <button
              type="button"
              className="w-full text-left p-sm flex items-center justify-between hover:bg-surface rounded-DEFAULT transition-colors group"
            >
              <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors font-medium">
                Subscription Plan
              </span>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                  Free
                </span>
                <span className="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary">
                  chevron_right
                </span>
              </div>
            </button>

            <button
              type="button"
              className="w-full text-left p-sm flex items-center justify-between hover:bg-surface rounded-DEFAULT transition-colors group"
            >
              <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors font-medium">
                Data Export
              </span>
              <span className="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary">
                chevron_right
              </span>
            </button>

            <div className="h-px bg-surface-variant my-xs" />

            <button
              type="button"
              onClick={() => alert("You've been signed out (demo mode).")}
              className="w-full text-left p-sm flex items-center gap-2 text-error hover:bg-error-container/20 rounded-DEFAULT transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="font-body-md text-body-md font-medium">Sign Out</span>
            </button>
          </div>

          {/* Legal & Support */}
          <div className="bg-surface-container-lowest rounded-DEFAULT md:rounded-lg p-md card-shadow flex flex-col gap-xs">
            <button
              type="button"
              className="w-full text-left p-sm flex items-center justify-between hover:bg-surface rounded-DEFAULT transition-colors group"
            >
              <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                Help &amp; Support
              </span>
              <span className="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary text-[18px]">
                open_in_new
              </span>
            </button>

            <button
              type="button"
              className="w-full text-left p-sm flex items-center justify-between hover:bg-surface rounded-DEFAULT transition-colors group"
            >
              <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                Terms of Service
              </span>
              <span className="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary">
                chevron_right
              </span>
            </button>

            <button
              type="button"
              className="w-full text-left p-sm flex items-center justify-between hover:bg-surface rounded-DEFAULT transition-colors group"
            >
              <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                Privacy Policy
              </span>
              <span className="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary">
                chevron_right
              </span>
            </button>

            <div className="pt-sm mt-xs border-t border-surface-variant flex justify-center">
              <span className="font-label-sm text-label-sm text-outline-variant">
                GlowTrack v2.1.0 • React Edition
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Concern Modal */}
      {isAddConcernOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-[24px] p-lg max-w-sm w-full shadow-nav space-y-md">
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Add Skin Concern
            </h3>
            <form onSubmit={handleAddConcernSubmit} className="space-y-md">
              <input
                type="text"
                value={newConcern}
                onChange={(e) => setNewConcern(e.target.value)}
                placeholder="e.g. Hyperpigmentation, Dullness"
                required
                className="w-full bg-surface-container-low border border-transparent rounded-full px-4 py-3 font-body-md text-on-surface focus:border-primary focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddConcernOpen(false)}
                  className="px-4 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full font-label-md text-label-md bg-primary text-on-primary hover:bg-primary/90"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Reminder Time Modal */}
      {editingTime && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-[24px] p-lg max-w-sm w-full shadow-nav space-y-md">
            <h3 className="font-headline-md text-headline-md text-on-surface capitalize">
              Set {editingTime} Time
            </h3>
            <form onSubmit={handleSaveTime} className="space-y-md">
              <input
                type="text"
                value={tempTime}
                onChange={(e) => setTempTime(e.target.value)}
                placeholder="e.g. 8:00 AM or 9:30 PM"
                required
                className="w-full bg-surface-container-low border border-transparent rounded-full px-4 py-3 font-body-md text-on-surface focus:border-primary focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTime(null)}
                  className="px-4 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full font-label-md text-label-md bg-primary text-on-primary hover:bg-primary/90"
                >
                  Save Time
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
