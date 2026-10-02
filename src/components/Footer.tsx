import React from 'react';
import { AlertCircle, Shield, ExternalLink, Heart } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isTa = language === 'ta';
  const t = getTranslation(language);

  return (
    <footer className="bg-white border-t border-emerald-100 text-slate-600 mt-16 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Strict Medical Disclaimer Notice */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 mb-8 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
            <span className="font-bold text-emerald-900 block mb-1">
              {t.disclaimerTitle}
            </span>
            {t.disclaimerText}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                FG
              </div>
              <span className="font-bold text-emerald-950 text-base">{t.brandName}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              {t.footerMission}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold pt-1">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>{isTa ? 'IWGDF 2023 & ADA வழிகாட்டுதல்கள்' : 'Grounded in ADA & IWGDF Diabetic Foot Standards'}</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
              {isTa ? 'மருத்துவக் குறிப்புகள்' : 'Clinical Guidelines'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a
                  href="https://iwgdfguidelines.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 flex items-center gap-1 transition-colors"
                >
                  IWGDF Prevention 2023 <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://diabetes.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 flex items-center gap-1 transition-colors"
                >
                  ADA Standards of Care <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.apma.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 flex items-center gap-1 transition-colors"
                >
                  APMA Diabetic Health <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
              {isTa ? 'அவசர உதவி' : 'Emergency Contact'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              {isTa
                ? 'காய்ச்சல், நடுக்கம், கருப்பான தோல் அல்லது சீழ் வடிந்தால் தாமதிக்காமல் அவசர உதவி பெறவும்.'
                : 'If you experience fever, black skin, or rapidly spreading redness, seek emergency care.'}
            </p>
            <div className="text-xs font-bold text-emerald-800">
              {t.footerHotline}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
          <div className="flex items-center gap-1">
            <span>{isTa ? 'நீரிழிவு பாத ஆரோக்கியத்திற்காக உருவாக்கப்பட்டது' : 'Built for diabetic foot wellness'}</span>
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          </div>
          <div>FootGuard AI • Tamil Nadu Diabetic Health Prototype</div>
        </div>
      </div>
    </footer>
  );
};
