import React from 'react';
import {
  AlertOctagon,
  ShieldAlert,
  Info,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Stethoscope,
  HelpCircle,
} from 'lucide-react';
import { DFU_SECTIONS } from '../data/dfuEducationalData';
import { Language, DFUSignItem } from '../types';

interface DFUSignsProps {
  language: Language;
  onGoToScreening: () => void;
}

export const DFUSignsPage: React.FC<DFUSignsProps> = ({ language, onGoToScreening }) => {
  const isTa = language === 'ta';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3">
            <AlertOctagon className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isTa ? 'நீரிழிவு பாத புண்கள் கல்வி வழிகாட்டி' : 'DFU Clinical Awareness Guide'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isTa
              ? 'நீரிழிவு பாதப் புண் – எச்சரிக்கை அறிகுறிகள் மற்றும் அறிகுறிகளை அறிந்துகொள்ளுங்கள்'
              : 'DFU – Know the Signs: Diabetic Foot Ulcer Symptoms & Warning Indicators'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            {isTa
              ? 'நீரிழிவு பாதப் புண் (Diabetic Foot Ulcer) என்பது நீரிழிவு உள்ளவர்களுக்கு பாதத்தில் ஏற்படும் ஒரு காயம் அல்லது திறந்த புண் ஆகும். ரத்த ஓட்டம் குறைவு மற்றும் நரம்புப் பாதிப்பு காரணமாக இது மிக மெதுவாகவே ஆறும். ஆரம்ப அறிகுறிகளை அறிவது காலைப் பாதுகாக்கும்.'
              : 'A Diabetic Foot Ulcer is a wound or open sore on the foot that can occur in people with diabetes and may heal slowly. Learn the critical visual warning signs, why early evaluation prevents amputations, and when to seek immediate emergency care.'}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onGoToScreening}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 flex items-center gap-2 transition-all focus:outline-hidden"
            >
              <Eye className="w-4 h-4 text-emerald-200" />
              <span>{isTa ? 'பாதத்தைப் படம் எடுத்து பரிசோதிக்க' : 'Scan Foot Image Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-emerald-50/80 border border-emerald-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
        <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold block mb-0.5">
            {isTa ? 'முக்கிய மருத்துவ வழிகாட்டல்:' : 'Core Educational Principle:'}
          </span>
          {isTa
            ? 'படங்களை அடிப்படையாகக் கொண்ட எந்த ஒரு AI ஆரம்பநிலை பரிசோதனை கருவியும் மருத்துவ நோயறிதலை உறுதிப்படுத்த முடியாது. பாதத்தில் ஏதேனும் காயம் அல்லது நிற மாற்றம் தென்பட்டால் தகுதியான மருத்துவரிடம் நேரில் பரிசோதிக்கவும்.'
            : 'An image-based AI screening tool cannot confirm a medical diagnosis. Clean medical guidance and early clinical intervention by podiatrists prevent over 85% of diabetic amputations.'}
        </div>
      </div>

      {/* 13 Educational Sections Grid */}
      <div className="space-y-5">
        {DFU_SECTIONS.map((section) => (
          <SectionCard key={section.id} section={section} isTa={isTa} />
        ))}
      </div>
    </div>
  );
};

const SectionCard: React.FC<{ section: DFUSignItem; isTa: boolean }> = ({ section, isTa }) => {
  const isEmergency = section.urgency === 'emergency';
  const isUrgent = section.urgency === 'urgent';

  const badgeColor = isEmergency
    ? 'bg-red-100 text-red-900 border-red-300'
    : isUrgent
    ? 'bg-amber-100 text-amber-900 border-amber-300'
    : 'bg-emerald-100 text-emerald-900 border-emerald-300';

  return (
    <div
      className={`bg-white rounded-3xl border-2 p-5 sm:p-6 transition-all shadow-xs ${
        isEmergency
          ? 'border-red-200 hover:border-red-400'
          : isUrgent
          ? 'border-amber-200 hover:border-amber-400'
          : 'border-emerald-200 hover:border-emerald-400'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border w-fit ${badgeColor}`}>
          {isTa ? section.badgeTextTa : section.badgeText}
        </span>
        <span className="text-[11px] font-semibold text-slate-500">
          {isEmergency
            ? isTa
              ? '🚨 அவசர மருத்துவ நிலை'
              : '🚨 Immediate Emergency Evaluation'
            : isUrgent
            ? isTa
              ? '⚠️ 24-48 மணி நேரத்திற்குள் பரிசோதிக்கவும்'
              : '⚠️ Urgent Clinical Review Required'
            : isTa
              ? '✓ அன்றாட விழிப்புணர்வு'
              : '✓ Routine Awareness'}
        </span>
      </div>

      <h3 className="font-black text-base sm:text-lg text-slate-900 leading-snug mb-2">
        {isTa ? section.titleTa : section.title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-4">
        {isTa ? section.shortDescTa : section.shortDesc}
      </p>

      {/* Bullet Points */}
      <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <span className="text-xs font-bold text-slate-800 block mb-1">
          {isTa ? 'முக்கிய தகவல்கள்:' : 'Key Clinical Points:'}
        </span>
        <ul className="space-y-1.5 text-xs text-slate-600">
          {(isTa ? section.detailsTa : section.details).map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  isEmergency ? 'bg-red-600' : isUrgent ? 'bg-amber-600' : 'bg-emerald-600'
                }`}
              ></span>
              <span className="leading-relaxed">{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
