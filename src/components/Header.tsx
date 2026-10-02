import React from 'react';
import {
  Camera,
  ShieldCheck,
  HeartPulse,
  Hospital,
  Sparkles,
  Apple,
  AlertOctagon,
  Globe,
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface HeaderProps {
  activeTab: 'scan' | 'signs' | 'diet' | 'dodont' | 'clinics' | 'kurai';
  setActiveTab: (tab: 'scan' | 'signs' | 'diet' | 'dodont' | 'clinics' | 'kurai') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
}) => {
  const t = getTranslation(language);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-18 flex items-center justify-between">
        {/* FootGuard AI Logo */}
        <button
          onClick={() => setActiveTab('scan')}
          className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-hidden"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 16v-2.38C4 11.5 5.5 10 7.5 10h.2c1.3 0 2.4.8 2.8 2l.7 2.1c.3 1 .6 1.9 1.8 1.9h2c1.7 0 3-1.3 3-3V7.5C18 5.5 16.5 4 14.5 4h-.2c-1.3 0-2.4.8-2.8 2L10 10" />
              <circle cx="16.5" cy="4" r="1" fill="currentColor" />
              <circle cx="13.5" cy="4.5" r="0.9" fill="currentColor" />
              <circle cx="10.8" cy="5.5" r="0.8" fill="currentColor" />
              <circle cx="8.5" cy="7" r="0.7" fill="currentColor" />
              <circle cx="6.5" cy="9" r="0.6" fill="currentColor" />
              <path d="M5 16c0 2.2 1.8 4 4 4h5c2.8 0 5-2.2 5-5v-1" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full flex items-center justify-center ring-2 ring-white">
              <Sparkles className="w-2 h-2 text-emerald-950" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-lg tracking-tight text-emerald-950 font-sans">
                {t.brandName}
              </span>
              <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                DFU
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-medium text-emerald-700/80 -mt-0.5 hidden md:block">
              {t.brandSubtitle}
            </p>
          </div>
        </button>

        {/* Navigation & Language Toggle */}
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeTab === 'scan'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.navScreening}</span>
            </button>

            <button
              onClick={() => setActiveTab('signs')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeTab === 'signs'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.navSigns}</span>
            </button>

            <button
              onClick={() => setActiveTab('diet')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeTab === 'diet'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.navDiet}</span>
            </button>

            <button
              onClick={() => setActiveTab('dodont')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeTab === 'dodont'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.navDoDont}</span>
            </button>

            <button
              onClick={() => setActiveTab('clinics')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeTab === 'clinics'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Hospital className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.navHealthcare}</span>
            </button>

            <button
              onClick={() => setActiveTab('kurai')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
                activeTab === 'kurai'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>{t.navKurai}</span>
            </button>
          </nav>

          {/* Bilingual Language Switcher (Requirement 9) */}
          <div className="flex items-center bg-emerald-50 border border-emerald-200 rounded-xl p-0.5 ml-1 sm:ml-2 shrink-0">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                language === 'en'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-emerald-800 hover:text-emerald-950'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                language === 'ta'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-emerald-800 hover:text-emerald-950'
              }`}
              title="தமிழுக்கு மாற்றவும்"
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
