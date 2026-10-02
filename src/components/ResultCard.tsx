import React from 'react';
import {
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Hospital,
  HeartPulse,
  Upload,
  ChevronRight,
  Info,
  Calendar,
  ShieldAlert,
} from 'lucide-react';
import { ScreeningResult, Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface ResultCardProps {
  screening: ScreeningResult;
  language: Language;
  onScanAgain: () => void;
  onOpenFootCare: () => void;
  onOpenHealthcare: () => void;
  onOpenKuraiAI: () => void;
  onUploadAnother: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  screening,
  language,
  onScanAgain,
  onOpenFootCare,
  onOpenHealthcare,
  onOpenKuraiAI,
  onUploadAnother,
}) => {
  const isTa = language === 'ta';
  const t = getTranslation(language);

  const {
    label,
    prediction,
    message,
    observations,
    qualityCheck,
    immediateRecommendations,
    imagePreviewUrl,
    timestamp,
  } = screening;

  const isNormal = prediction === 'normal' || label === 'NORMAL';
  const isAbnormal = prediction === 'abnormal' || label === 'POSSIBLE_DFU';
  const isUncertain = prediction === 'uncertain' || label === 'LOW_QUALITY';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Main Result Card */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border-2 shadow-lg transition-all ${
          isNormal
            ? 'bg-white border-emerald-500 shadow-emerald-500/10 ring-4 ring-emerald-500/10'
            : isAbnormal
            ? 'bg-white border-red-500 shadow-red-500/10 ring-4 ring-red-500/10'
            : 'bg-white border-amber-500 shadow-amber-500/10 ring-4 ring-amber-500/10'
        }`}
      >
        {/* Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            {/* Visual Status Indicator Icon */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 ${
                isNormal
                  ? 'bg-emerald-600 shadow-emerald-600/30'
                  : isAbnormal
                  ? 'bg-red-600 shadow-red-600/30 animate-pulse'
                  : 'bg-amber-500 shadow-amber-500/30'
              }`}
            >
              {isNormal && <CheckCircle2 className="w-8 h-8" />}
              {isAbnormal && <AlertOctagon className="w-8 h-8" />}
              {isUncertain && <AlertTriangle className="w-8 h-8" />}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border ${
                    isNormal
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : isAbnormal
                      ? 'bg-red-50 text-red-800 border-red-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}
                >
                  {isNormal && (isTa ? '🟢 இயல்பானது / புண்கள் இல்லை' : '🟢 NORMAL / NO OBVIOUS VISIBLE ULCER')}
                  {isAbnormal && (isTa ? '🔴 அசாதாரண புண் / DFU சாத்தியம்' : '🔴 ABNORMAL / POSSIBLE DFU')}
                  {isUncertain && (isTa ? '🟡 குறைந்த தரம் / மீண்டும் எடுக்கவும்' : '🟡 LOW QUALITY / RECAPTURE IMAGE')}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {timestamp}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {isNormal && (isTa ? 'இயல்பான பாதத் தோற்றம்' : 'Normal-Looking Foot Appearance')}
                {isAbnormal && (isTa ? 'புண் போன்ற தோற்றம் கண்டறியப்பட்டது' : 'Visible Wound / Ulcer-Like Lesion Detected')}
                {isUncertain && (isTa ? 'படத்தின் தரம் போதுமானதாக இல்லை' : 'Image Quality Insufficient for Screening')}
              </h2>
            </div>
          </div>

          {/* Valid Calibration / Screening Status Badge (Requirement 6) */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center p-3 sm:p-0 bg-slate-50 sm:bg-transparent rounded-xl">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {isTa ? 'பரிசோதனை நிலை' : 'Screening Status'}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`text-sm font-extrabold px-2.5 py-1 rounded-lg ${
                  isNormal
                    ? 'bg-emerald-100 text-emerald-900'
                    : isAbnormal
                    ? 'bg-red-100 text-red-900'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {isTa ? 'ஆரம்பநிலை முடிவு' : 'Preliminary Screen'}
              </span>
            </div>
          </div>
        </div>

        {/* Standardized Core Summary Message (Strictly following Requirements 2 & 14) */}
        <div
          className={`my-6 p-4 sm:p-5 rounded-2xl border text-sm sm:text-base font-semibold leading-relaxed ${
            isNormal
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : isAbnormal
              ? 'bg-red-50/80 border-red-200 text-red-950'
              : 'bg-amber-50/80 border-amber-200 text-amber-950'
          }`}
        >
          {isTa
            ? isNormal
              ? 'ஆரம்பநிலை AI பரிசோதனையில் பாதம் இயல்பாகத் தெரிகிறது. பதிவேற்றப்பட்ட படத்தில் வெளிப்படையான வெட்டுக் காயங்களோ அல்லது புண்களோ தென்படவில்லை.'
              : isAbnormal
              ? 'பாதத்தில் புண் அல்லது காயம் போன்ற அசாதாரண தோற்றம் கண்டறியப்பட்டுள்ளது. தகுதியான மருத்துவரை அணுகி முழு பரிசோதனை செய்ய பரிந்துரைக்கப்படுகிறது.'
              : 'நல்ல வெளிச்சத்தில் பாதத்தை மங்கலின்றி மீண்டும் படம் எடுக்கவும். படம் மங்கலாகவோ அல்லது மிகவும் இருட்டாகவோ உள்ளது.'
            : message}
        </div>

        {/* Image Preview & Observations Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6 border-b border-slate-100">
          {/* Inspected Image Thumbnail */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isTa ? 'பரிசோதிக்கப்பட்ட படம்' : 'Screened Image Frame'}
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 aspect-4/3 shadow-xs">
              <img
                src={imagePreviewUrl}
                alt="Screened foot capture"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase text-white ${
                  isNormal ? 'bg-emerald-600' : isAbnormal ? 'bg-red-600' : 'bg-amber-600'
                }`}
              >
                {label}
              </div>
            </div>

            <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <div className="font-semibold text-slate-700 mb-1">
                {isTa ? 'படத் தரப் பரிசோதனை:' : 'Image Quality Assessment:'}
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span>{isTa ? 'பாத வடிவம் தெரிந்தது:' : 'Foot Anatomy Visible:'}</span>
                <span className="font-bold text-slate-800">
                  {qualityCheck.isFoot ? (isTa ? 'ஆம்' : 'Yes') : (isTa ? 'தெளிவில்லை' : 'Unclear')}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] mt-0.5">
                <span>{isTa ? 'வெளிச்சம் & கவனம்:' : 'Lighting & Focus:'}</span>
                <span className="font-bold text-slate-800 capitalize">{qualityCheck.lighting}</span>
              </div>
            </div>
          </div>

          {/* Genuine, Non-Hallucinated Visual Observations (Requirement 2) */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                {isTa ? 'பரிசோதனை அவதானிப்புகள் (உண்மை காட்சி ஆதாரம்)' : 'Preliminary Screening Observations (Visible Evidence Only)'}
              </h3>

              <div className="space-y-2">
                {observations.map((obs, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        isNormal ? 'bg-emerald-500' : isAbnormal ? 'bg-red-500' : 'bg-amber-500'
                      }`}
                    ></div>
                    <span>{obs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isTa ? 'பரிந்துரைக்கப்படும் நடவடிக்கைகள்:' : 'Recommended Actions:'}
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                {immediateRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Standardized Result Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
          {isNormal && (
            <>
              <button
                onClick={onScanAgain}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-all focus:outline-hidden"
              >
                <RotateCcw className="w-4 h-4 text-slate-600" />
                <span>{t.btnScanAgain}</span>
              </button>

              <button
                onClick={onOpenFootCare}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-bold text-sm flex items-center justify-center gap-2 transition-all focus:outline-hidden"
              >
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>{t.btnFootCare}</span>
              </button>

              <button
                onClick={onOpenKuraiAI}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all focus:outline-hidden"
              >
                <HeartPulse className="w-4 h-4 text-emerald-200" />
                <span>{t.btnAskKurai}</span>
              </button>
            </>
          )}

          {isAbnormal && (
            <>
              <button
                onClick={onScanAgain}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-all focus:outline-hidden"
              >
                <RotateCcw className="w-4 h-4 text-slate-600" />
                <span>{t.btnScanAgain}</span>
              </button>

              <button
                onClick={onOpenHealthcare}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-700/25 flex items-center justify-center gap-2 transition-all focus:outline-hidden"
              >
                <Hospital className="w-4 h-4 text-red-100" />
                <span>{isTa ? 'தமிழக மருத்துவமனைகள்' : 'FIND HEALTHCARE (TN)'}</span>
              </button>

              <button
                onClick={onOpenKuraiAI}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all focus:outline-hidden"
              >
                <HeartPulse className="w-4 h-4 text-emerald-200" />
                <span>{t.btnAskKurai}</span>
              </button>
            </>
          )}

          {isUncertain && (
            <>
              <button
                onClick={onScanAgain}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-600/25 flex items-center justify-center gap-2 transition-all focus:outline-hidden"
              >
                <RotateCcw className="w-4 h-4 text-white" />
                <span>{t.btnRecapture}</span>
              </button>

              <button
                onClick={onUploadAnother}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm flex items-center justify-center gap-2 transition-all focus:outline-hidden"
              >
                <Upload className="w-4 h-4 text-slate-600" />
                <span>{t.btnUploadAnother}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mandatory Non-Diagnostic Clinical Disclaimer (Requirements 6 & 10) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-xs sm:text-sm text-slate-600">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-slate-800 block mb-0.5">
            {isTa ? 'முக்கிய மருத்துவ அறிவிப்பு:' : 'Clinical Protocol Notice:'}
          </span>
          {isTa
            ? 'ஃபுட்கார்ட் AI என்பது ஒரு முதற்கட்ட விழிப்புணர்வு மற்றும் ஆரம்பநிலை பரிசோதனை மட்டுமே. இது மருத்துவ நோயறிதல் அல்ல. AI பரிசோதனை மூலம் இறுதி முடிவெடுக்க முடியாது. பாதத்தில் ஏதேனும் மாற்றம் தென்பட்டால் உடனடியாக மருத்துவரை அணுகவும்.'
            : 'AI screening is preliminary and does not replace professional medical evaluation. An image-based screening tool cannot confirm a medical diagnosis. Even with a normal result, continue your daily foot inspection routine. If you notice any concerning changes, consult your healthcare provider.'}
        </div>
      </div>
    </div>
  );
};
