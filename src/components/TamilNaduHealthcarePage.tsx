import React, { useState } from 'react';
import {
  Hospital,
  MapPin,
  Phone,
  Globe,
  ExternalLink,
  Search,
  ShieldAlert,
  Clock,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { TAMIL_NADU_HOSPITALS } from '../data/tamilNaduHospitals';
import { Language } from '../types';

interface HealthcareProps {
  language: Language;
}

export const TamilNaduHealthcarePage: React.FC<HealthcareProps> = ({ language }) => {
  const isTa = language === 'ta';
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = [
    'all',
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
    'Tirunelveli',
    'Vellore',
    'Dindigul',
  ];

  const filteredHospitals = TAMIL_NADU_HOSPITALS.filter((h) => {
    const matchesCity = selectedCity === 'all' || h.city === selectedCity;
    const matchesSector = selectedSector === 'all' || h.sector === selectedSector;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      h.name.toLowerCase().includes(q) ||
      (h.nameTa && h.nameTa.toLowerCase().includes(q)) ||
      h.city.toLowerCase().includes(q) ||
      h.services.some((s) => s.toLowerCase().includes(q));

    return matchesCity && matchesSector && matchesSearch;
  });

  const openDirections = (query: string) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      '_blank'
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-3">
            <Hospital className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isTa ? 'தமிழ்நாடு சுகாதார வழிகாட்டி' : 'Tamil Nadu Clinical Referral Directory'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isTa
              ? 'தமிழ்நாடு நீரிழிவு பாதப் புண் மற்றும் காயப் பராமரிப்பு மையங்கள்'
              : 'Tamil Nadu DFU & Diabetic Foot Healthcare Centers'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            {isTa
              ? 'நீரிழிவு பாதப் புண்களை ஆரம்பத்திலேயே தகுதியான அரசு மற்றும் தனியார் சிறப்பு மையங்களில் பரிசோதிப்பது கால்களைப் பாதுகாக்க உதவும். சென்னை, கோவை, மதுரை, திருச்சி, வேலூர் உள்ளிட்ட மாவட்டங்களின் முன்னணி மையங்கள் இங்கே பட்டியலிடப்பட்டுள்ளன.'
              : 'Prompt clinical evaluation of open foot sores, skin breakdown, or deep fissures saves limbs. Directory of verified government medical colleges, specialized diabetes institutes, and podiatric limb salvage departments across Tamil Nadu.'}
          </p>
        </div>
      </div>

      {/* Emergency Hotline Box */}
      <div className="bg-red-50/90 border-2 border-red-300 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-red-950 text-base sm:text-lg">
              {isTa ? 'அவசர மருத்துவ உதவி (24/7 ஆம்புலன்ஸ் சேவை)' : 'Emergency Urgent Care Hotline (24/7)'}
            </h3>
            <p className="text-xs sm:text-sm text-red-800">
              {isTa
                ? 'காய்ச்சல், நடுக்கம், கால் கருப்பாகுதல் அல்லது தீவிரமாகப் பரவும் சிவப்பு வளையம் இருந்தால் உடனடியாக 108 அழைக்கவும்.'
                : 'For sudden tissue discoloration, severe spreading redness, or systemic fever, dial 108 immediately.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-stretch sm:self-auto">
          <a
            href="tel:108"
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>108 (Tamil Nadu)</span>
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                isTa
                  ? 'மருத்துவமனை பெயர், நகரம் அல்லது சேவையைத் தேடவும்...'
                  : 'Search by hospital name, city, or service...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Sector Filter */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedSector('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSector === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isTa ? 'அனைத்தும்' : 'All Sectors'}
            </button>
            <button
              onClick={() => setSelectedSector('Government')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSector === 'Government'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {isTa ? 'அரசு மருத்துவமனைகள்' : 'Government Hospitals'}
            </button>
            <button
              onClick={() => setSelectedSector('Private')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSector === 'Private'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {isTa ? 'தனியார் சிறப்பு மையங்கள்' : 'Private Specialists'}
            </button>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 text-xs">
          <span className="font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>{isTa ? 'நகரம்:' : 'City:'}</span>
          </span>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                selectedCity === city
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {city === 'all' ? (isTa ? 'அனைத்து நகரங்களும்' : 'All Cities') : city}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredHospitals.map((hospital) => {
          const isGov = hospital.sector === 'Government';

          return (
            <div
              key={hospital.id}
              className={`bg-white border-2 rounded-3xl p-5 sm:p-6 transition-all shadow-xs flex flex-col justify-between ${
                isGov
                  ? 'border-emerald-200 hover:border-emerald-400'
                  : 'border-teal-200 hover:border-teal-400'
              }`}
            >
              <div>
                {/* Badges */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap gap-1.5">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border ${
                        isGov
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-teal-100 text-teal-900 border-teal-300'
                      }`}
                    >
                      {isGov ? (isTa ? 'அரசு மருத்துவமனை' : 'Government Hospital') : (isTa ? 'தனியார் சிறப்பு மையம்' : 'Private Speciality')}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {hospital.city}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Hospital Name */}
                <h3 className="font-black text-base sm:text-lg text-slate-900 leading-snug mb-1">
                  {isTa && hospital.nameTa ? hospital.nameTa : hospital.name}
                </h3>
                {isTa && (
                  <p className="text-xs text-slate-500 font-medium mb-2">{hospital.name}</p>
                )}

                {/* Department */}
                <p className="text-xs font-bold text-emerald-800 mb-3 bg-emerald-50/80 p-2 rounded-xl border border-emerald-100">
                  {isTa && hospital.departmentTa ? hospital.departmentTa : hospital.department}
                </p>

                {/* Address & Contact info */}
                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{hospital.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-bold text-slate-800">{hospital.phone}</span>
                  </div>
                  {hospital.emergencyPhone && (
                    <div className="flex items-center gap-2 text-red-700">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-semibold">
                        {isTa ? 'அவசர எண்:' : 'Emergency:'} {hospital.emergencyPhone}
                      </span>
                    </div>
                  )}
                </div>

                {/* Services */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                    {isTa ? 'கிடைக்கும் சிறப்பு சிகிச்சைகள்:' : 'Available Clinical Services:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(isTa && hospital.servicesTa ? hospital.servicesTa : hospital.services).map(
                      (service, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                        >
                          {service}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {hospital.website ? (
                  <a
                    href={hospital.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-slate-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{isTa ? 'வலைத்தளம்' : 'Official Website'}</span>
                  </a>
                ) : (
                  <div></div>
                )}

                <button
                  onClick={() => openDirections(hospital.directionsQuery)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all focus:outline-hidden"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isTa ? 'வழித்தடம் (Google Maps)' : 'Get Directions'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
          <p className="font-bold text-slate-800">
            {isTa ? 'பொருத்தமான மையங்கள் எதுவும் கிடைக்கவில்லை' : 'No matching healthcare centers found'}
          </p>
          <p className="text-xs text-slate-500">
            {isTa
              ? 'வேறு நகரம் அல்லது பெயரைத் தேர்வு செய்து பார்க்கவும்.'
              : 'Try clearing the search query or selecting a different city.'}
          </p>
        </div>
      )}
    </div>
  );
};
