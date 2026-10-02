import React, { useState } from 'react';
import {
  Apple,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Droplet,
  Utensils,
  Info,
  Sparkles,
  PieChart,
} from 'lucide-react';
import { INDIAN_FOOD_ITEMS, MEAL_IDEAS, HYDRATION_TIPS } from '../data/indianDietData';
import { Language, FoodItem } from '../types';

interface DietProps {
  language: Language;
}

export const IndianDietPage: React.FC<DietProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [filterCategory, setFilterCategory] = useState<'all' | 'prefer' | 'limit' | 'avoid'>('all');

  const filteredFoods = INDIAN_FOOD_ITEMS.filter((item) => {
    return filterCategory === 'all' || item.category === filterCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3">
            <Apple className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isTa ? 'நீரிழிவு பாத ஆரோக்கிய உணவு முறை' : 'Diabetic Foot Health – Indian Food Guide'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isTa
              ? 'இந்திய உணவு வழிகாட்டி: பாத நலன் மற்றும் புண்களைத் தடுக்கும் சத்துணவு'
              : 'Indian Nutrition Guide: Protecting Feet & Fueling Wound Healing'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            {isTa
              ? 'ரத்த சர்க்கரை அளவைச் சீராக வைப்பதும், போதுமான புரதங்கள் மற்றும் நுண்ணூட்டச் சத்துக்களை உண்பதும் பாத நரம்புகளைப் பாதுகாக்கவும், புண்கள் வராமல் தடுக்கவும் மிக அவசியம். நமது பாரம்பரிய இந்திய மற்றும் தென்னிந்திய உணவுகளை அடிப்படையாகக் கொண்ட வழிகாட்டி.'
              : 'Tight glycemic control coupled with essential amino acids, zinc, and antioxidants prevents peripheral neuropathy progression and supplies the collagen needed to heal diabetic foot tissue. Grounded in traditional Indian dietary staples.'}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 ${
              filterCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isTa ? 'அனைத்து உணவுகளும்' : 'All Foods'} ({INDIAN_FOOD_ITEMS.length})
          </button>
          <button
            onClick={() => setFilterCategory('prefer')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all shrink-0 ${
              filterCategory === 'prefer'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isTa ? 'அடிக்கடி சேர்க்க வேண்டியவை (Prefer)' : 'Prefer / Include Often'}</span>
          </button>
          <button
            onClick={() => setFilterCategory('limit')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all shrink-0 ${
              filterCategory === 'limit'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{isTa ? 'அளவோடு உண்ண வேண்டியவை (Limit)' : 'Limit / In Moderation'}</span>
          </button>
          <button
            onClick={() => setFilterCategory('avoid')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all shrink-0 ${
              filterCategory === 'avoid'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-red-50 text-red-800 hover:bg-red-100'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>{isTa ? 'தவிர்க்க வேண்டியவை (Avoid)' : 'Avoid / Minimize'}</span>
          </button>
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFoods.map((food) => (
          <FoodCard key={food.id} food={food} isTa={isTa} />
        ))}
      </div>

      {/* Balanced Meal Plate (50-25-25 Rule) */}
      <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
              {isTa ? 'சமச்சீர் நீரிழிவு தட்டு முறை (The 50-25-25 Plate Method)' : 'The 50-25-25 Diabetic Plate Method'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {isTa
                ? 'ஒவ்வொரு வேளை உணவிலும் தட்டைப் பிரிக்கும் எளிய முறை'
                : 'Simple visual balance to stabilize blood glucose and fuel tissue healing'}
            </p>
          </div>
        </div>

        {/* Visual Plate Graphic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-center">
            <span className="text-2xl font-black text-emerald-800">50%</span>
            <h4 className="font-bold text-sm text-emerald-950 mt-1">
              {isTa ? 'காய்கறிகள் & கீரைகள்' : 'Non-Starchy Vegetables & Greens'}
            </h4>
            <p className="text-xs text-emerald-800/80 mt-1">
              {isTa ? 'சுரைக்காய், வெண்டைக்காய், முருங்கைக்கீரை, கோவக்காய்' : 'Cooked greens, cabbage, beans, bottle gourd, cucumber, salads'}
            </p>
          </div>

          <div className="bg-teal-50 border-2 border-teal-300 rounded-2xl p-4 text-center">
            <span className="text-2xl font-black text-teal-800">25%</span>
            <h4 className="font-bold text-sm text-teal-950 mt-1">
              {isTa ? 'புரதச்சத்து உணவுகள்' : 'Lean Proteins'}
            </h4>
            <p className="text-xs text-teal-800/80 mt-1">
              {isTa ? 'பாசிப்பயறு, சுண்டல், தால், அவித்த முட்டை, மீன்' : 'Moong dal, chana sundal, rajma, boiled eggs, fish, tofu, curd'}
            </p>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center">
            <span className="text-2xl font-black text-amber-800">25%</span>
            <h4 className="font-bold text-sm text-amber-950 mt-1">
              {isTa ? 'முழு தானியங்கள்' : 'Whole Grains & Millets'}
            </h4>
            <p className="text-xs text-amber-800/80 mt-1">
              {isTa ? 'கேழ்வரகு, குதிரைவாலி, சாமை, கைக்குத்தல் அரிசி' : 'Kuthiraivali, ragi, brown rice, whole wheat phulkas in strict moderation'}
            </p>
          </div>
        </div>

        {/* Meal Ideas */}
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-sm text-slate-800">
            {isTa ? 'ஆரோக்கியமான தென்னிந்திய உணவு யோசனைகள்:' : 'Healthy Traditional Indian Meal Ideas:'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MEAL_IDEAS.map((meal, idx) => (
              <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="font-bold text-xs text-slate-900 block mb-1">
                  {isTa ? meal.titleTa : meal.title}
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {isTa ? meal.descriptionTa : meal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hydration Section */}
      <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
              {isTa ? 'நீர்ச்சத்து மற்றும் பாரம்பரிய பானங்கள்' : 'Hydration & Healthy Fluid Guidelines'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {isTa ? 'பாதத் தோலின் ஈரப்பதத்தைப் பராமரிக்க போதுமான நீர்ச்சத்து அவசியம்' : 'Crucial for preserving skin elasticity and flushing excess circulatory glucose'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {HYDRATION_TIPS.map((tip, idx) => (
            <div key={idx} className="bg-teal-50/60 p-4 rounded-2xl border border-teal-200">
              <h4 className="font-bold text-xs sm:text-sm text-teal-950 mb-1">
                {isTa ? tip.titleTa : tip.title}
              </h4>
              <p className="text-xs text-teal-900/80 leading-relaxed">{isTa ? tip.descTa : tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Diet Disclaimer Notice (Requirement 10) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-slate-800 block mb-0.5">
            {isTa ? 'முக்கிய ஊட்டச்சத்து மருத்துவ அறிவிப்பு:' : 'Important Nutritional Notice:'}
          </span>
          {isTa
            ? 'உணவுத் தேவைகள் ஒவ்வொரு நபருக்கும் மாறுபடும். நீரிழிவு உள்ளவர்கள் தங்களது மருத்துவர் அல்லது சான்றளிக்கப்பட்ட உணவியல் நிபுணரின் (Registered Dietitian) வழிகாட்டுதலைப் பின்பற்ற வேண்டும்.'
            : 'Food requirements vary from person to person. People with diabetes should follow advice from their doctor or registered dietitian. This guide provides general educational awareness for nutritional foot wellness.'}
        </div>
      </div>
    </div>
  );
};

const FoodCard: React.FC<{ food: FoodItem; isTa: boolean }> = ({ food, isTa }) => {
  const isPrefer = food.category === 'prefer';
  const isLimit = food.category === 'limit';
  const isAvoid = food.category === 'avoid';

  const badgeColor = isPrefer
    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
    : isLimit
    ? 'bg-amber-100 text-amber-900 border-amber-300'
    : 'bg-red-100 text-red-900 border-red-300';

  const categoryText = isPrefer
    ? isTa
      ? 'அடிக்கடி சேர்க்கவும்'
      : 'Prefer Often'
    : isLimit
    ? isTa
      ? 'அளவோடு'
      : 'Limit / Moderate'
    : isTa
    ? 'தவிர்க்கவும்'
    : 'Avoid / Minimize';

  return (
    <div
      className={`bg-white rounded-3xl border-2 p-5 transition-all shadow-xs flex flex-col justify-between ${
        isPrefer
          ? 'border-emerald-200 hover:border-emerald-400'
          : isLimit
          ? 'border-amber-200 hover:border-amber-400'
          : 'border-red-200 hover:border-red-400'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border ${badgeColor}`}>
            {categoryText}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
            {food.glycemicImpact}
          </span>
        </div>

        <h3 className="font-extrabold text-base text-slate-900 leading-snug mb-0.5">
          {isTa ? food.nameTa : food.name}
        </h3>
        {isTa && (
          <p className="text-[11px] font-medium text-slate-500 mb-2">{food.name}</p>
        )}

        <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700 mb-3">
          <span className="text-slate-400 mr-1">{isTa ? 'பரிந்துரை:' : 'Portion:'}</span>
          <span>{isTa ? food.portionNoteTa : food.portionNote}</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {isTa ? food.explanationTa : food.explanation}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
        <span>{isPrefer ? '✓ Wound Healing Nutrients' : isLimit ? '⚠️ Monitor Portions' : '✗ Acute Glucose Spike Risk'}</span>
      </div>
    </div>
  );
};
