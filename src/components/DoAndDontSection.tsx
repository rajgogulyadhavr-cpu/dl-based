import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ShieldCheck,
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { DO_ITEMS, DONT_ITEMS } from '../data/footCareGuidelines';
import { Language, FootCareItem } from '../types';

interface DoDontProps {
  language: Language;
}

export const DoAndDontSection: React.FC<DoDontProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [activeFilter, setActiveFilter] = useState<'all' | 'do' | 'dont'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const displayedDos = activeFilter === 'dont' ? [] : DO_ITEMS;
  const displayedDonts = activeFilter === 'do' ? [] : DONT_ITEMS;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isTa ? 'பாதப் பாதுகாப்பு நெறிமுறைகள்' : 'Diabetic Foot Hygiene Standards'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isTa
              ? 'பாதப் பராமரிப்பு: செய்ய வேண்டியவை & செய்யக்கூடாதவை'
              : 'Diabetic Foot Care: Essential DOs & DON’Ts'}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            {isTa
              ? 'நீரிழிவு நரம்புப் பாதிப்பால் பாதங்களில் உணர்ச்சி குறைவதால் வலி தெரிவதில்லை. சரியான முன்னெச்சரிக்கைகளைப் பின்பற்றுவதும், ஆபத்தான பழக்கங்களைத் தவிர்ப்பதும் 85%க்கும் அதிகமான கால் வெட்டப்படும் ஆபத்துகளைத் தடுக்கிறது.'
              : 'Diabetic peripheral neuropathy dulls sensory perception in the feet. Practicing verified preventative hygiene and avoiding critical hazards prevents up to 85% of foot ulcerations and amputations.'}
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isTa ? 'அனைத்து நெறிமுறைகளும்' : 'All Protocols'} ({DO_ITEMS.length + DONT_ITEMS.length})
          </button>
          <button
            onClick={() => setActiveFilter('do')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeFilter === 'do'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isTa ? 'செய்ய வேண்டியவை' : 'Recommended DOs'} ({DO_ITEMS.length})</span>
          </button>
          <button
            onClick={() => setActiveFilter('dont')}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              activeFilter === 'dont'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-red-50 text-red-800 hover:bg-red-100'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{isTa ? 'செய்யக்கூடாதவை' : 'Dangerous DON’Ts'} ({DONT_ITEMS.length})</span>
          </button>
        </div>
      </div>

      {/* Grid of Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DO COLUMN */}
        {displayedDos.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-emerald-950 text-lg">
                {isTa ? 'அன்றாடம் செய்ய வேண்டியவை (DO)' : 'Recommended Daily Practices (DO)'}
              </h3>
            </div>

            {displayedDos.map((item) => (
              <CareCard
                key={item.id}
                item={item}
                isTa={isTa}
                isExpanded={expandedId === item.id}
                onToggle={() => toggleExpand(item.id)}
              />
            ))}
          </div>
        )}

        {/* DON'T COLUMN */}
        {displayedDonts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center">
                <XCircle className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-red-950 text-lg">
                {isTa ? 'தவிர்க்க வேண்டிய ஆபத்தான பழக்கங்கள் (DON’T)' : 'Hazardous Behaviors to Avoid (DON’T)'}
              </h3>
            </div>

            {displayedDonts.map((item) => (
              <CareCard
                key={item.id}
                item={item}
                isTa={isTa}
                isExpanded={expandedId === item.id}
                onToggle={() => toggleExpand(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reference Citation */}
      <div className="bg-white border border-emerald-100 rounded-2xl p-5 text-xs text-slate-600 flex items-start gap-3 shadow-xs">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-slate-800">
            {isTa ? 'ஆதார வழிகாட்டி:' : 'Clinical Guidelines Attribution: '}
          </span>
          {isTa
            ? 'அனைத்து பாதப் பராமரிப்பு வழிமுறைகளும் சர்வதேச நீரிழிவு பாத வழிகாட்டுதல் (IWGDF 2023) மற்றும் அமெரிக்க நீரிழிவு சங்கத்தின் (ADA) வழிகாட்டுதல்களை அடிப்படையாகக் கொண்டவை.'
            : 'Adapted from the International Working Group on the Diabetic Foot (IWGDF) Guidelines 2023 and the American Diabetes Association (ADA) Standards of Care in Diabetes.'}
        </div>
      </div>
    </div>
  );
};

const CareCard: React.FC<{
  item: FootCareItem;
  isTa: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ item, isTa, isExpanded, onToggle }) => {
  const isDo = item.type === 'do';

  return (
    <div
      className={`bg-white rounded-2xl border-2 transition-all shadow-xs ${
        isDo
          ? 'border-emerald-200 hover:border-emerald-400'
          : 'border-red-200 hover:border-red-400'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span
            className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
              isDo
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            {item.badge}
          </span>
          <span className="text-[11px] font-medium text-slate-400 capitalize">
            {item.category}
          </span>
        </div>

        <h4 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
          {isDo ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{item.title}</span>
        </h4>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
          {item.summary}
        </p>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block mb-1.5">
                {isTa ? 'செய்முறை வழிகாட்டல்:' : 'Step-by-Step Guidance:'}
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {item.detailedGuidance.map((guide, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        isDo ? 'bg-emerald-600' : 'bg-red-600'
                      }`}
                    ></span>
                    <span>{guide}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`p-3 rounded-xl text-xs leading-relaxed ${
                isDo ? 'bg-emerald-50/70 text-emerald-950' : 'bg-red-50/70 text-red-950'
              }`}
            >
              <span className="font-bold block mb-0.5">
                {isTa ? 'மருத்துவக் காரணம்:' : 'Medical Rationale:'}
              </span>
              {item.medicalRationale}
            </div>

            <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
              <span>Source: {item.source}</span>
            </div>
          </div>
        )}

        <button
          onClick={onToggle}
          className={`w-full mt-3 pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-xs font-bold transition-colors focus:outline-hidden ${
            isDo
              ? 'text-emerald-700 hover:text-emerald-800'
              : 'text-red-700 hover:text-red-800'
          }`}
        >
          <span>
            {isExpanded
              ? isTa ? 'சுருக்கவும்' : 'Show Less'
              : isTa ? 'முழு மருத்துவ விளக்கத்தைக் காண' : 'View Clinical Details & Rationale'}
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
