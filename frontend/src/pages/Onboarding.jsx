import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { skinType, setSkinType } = useApp();

  const skinTypes = [
    {
      id: 'Oily',
      title: 'Oily',
      icon: 'water_drop',
      colorBg: 'bg-secondary-container/30',
      colorHoverBg: 'group-hover:bg-secondary-container/50',
      textColor: 'text-on-secondary-container'
    },
    {
      id: 'Dry',
      title: 'Dry',
      icon: 'air',
      colorBg: 'bg-tertiary-container/30',
      colorHoverBg: 'group-hover:bg-tertiary-container/50',
      textColor: 'text-on-tertiary-container'
    },
    {
      id: 'Combination',
      title: 'Combination',
      icon: 'contrast',
      colorBg: 'bg-surface-variant/50',
      colorHoverBg: 'group-hover:bg-surface-variant',
      textColor: 'text-on-surface-variant',
      colSpan: 'col-span-2 md:col-span-1'
    },
    {
      id: 'Sensitive',
      title: 'Sensitive',
      icon: 'spa',
      colorBg: 'bg-primary-container',
      colorHoverBg: 'group-hover:bg-primary-container/80',
      textColor: 'text-on-primary-container'
    },
    {
      id: 'Normal',
      title: 'Normal',
      icon: 'face',
      colorBg: 'bg-secondary-container/30',
      colorHoverBg: 'group-hover:bg-secondary-container/50',
      textColor: 'text-on-secondary-container'
    }
  ];

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="flex-grow flex flex-col px-margin-mobile md:px-margin-desktop py-lg md:py-xl max-w-[1140px] mx-auto w-full relative z-10">
      {/* Header Section */}
      <div className="text-center mb-lg">
        <span className="inline-block bg-primary-container text-on-primary-container font-label-md text-label-md px-4 py-1 rounded-full mb-md">
          Step 1 of 3
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-sm">
          Tell us about your skin
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
          Select your primary skin type to help us personalize your GlowTrack routine.
        </p>
      </div>

      {/* Bento Grid for Skin Types */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-sm md:gap-gutter max-w-3xl mx-auto w-full mb-xl">
        {skinTypes.map((type) => {
          const isSelected = skinType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setSkinType(type.id)}
              className={`bg-surface-container-lowest rounded-[24px] p-md flex flex-col items-center justify-center gap-sm transition-all duration-300 border h-40 relative group ${
                type.colSpan || ''
              } ${
                isSelected
                  ? 'selected-glow scale-[1.02] border-primary'
                  : 'ambient-shadow hover:-translate-y-1 border-transparent hover:border-surface-variant'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-primary animate-in fade-in zoom-in duration-200">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              )}

              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-primary-container text-on-primary-container' : `${type.colorBg} ${type.colorHoverBg} ${type.textColor}`
                }`}
              >
                <span
                  className="material-symbols-outlined text-[32px]"
                  style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {type.icon}
                </span>
              </div>

              <span
                className={`font-body-md text-body-md text-on-surface ${
                  isSelected ? 'font-semibold' : 'font-medium'
                }`}
              >
                {type.title}
              </span>

              {isSelected && (
                <div className="absolute inset-0 bg-primary/5 pointer-events-none rounded-[24px]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Action Area */}
      <div className="mt-auto pt-lg pb-md flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto">
        <button
          onClick={handleContinue}
          className="w-full md:w-auto md:min-w-[300px] bg-primary text-on-primary py-4 px-8 rounded-full font-label-md text-label-md uppercase tracking-wider ambient-shadow hover:bg-primary/90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          Continue
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
