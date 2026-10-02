import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  FileImage,
  Eye,
  Sliders,
  Zap,
} from 'lucide-react';
import { SAMPLE_PRESETS, TestPreset } from '../data/samplePresets';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface CameraScannerProps {
  language: Language;
  onImageSelected: (base64Data: string) => void;
  isAnalyzing: boolean;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({
  language,
  onImageSelected,
  isAnalyzing,
}) => {
  const isTa = language === 'ta';
  const t = getTranslation(language);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Check camera device support
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const videoDevices = devices.filter((d) => d.kind === 'videoinput');
          setHasMultipleCameras(videoDevices.length > 1);
        })
        .catch(() => {});
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    setCameraError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        // Direct mobile camera fallback via file input
        cameraInputRef.current?.click();
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      setPreviewImage(null);
    } catch (err: any) {
      console.warn('Camera error:', err);
      let message = isTa
        ? 'கேமராவைத் திறக்க முடியவில்லை. உங்கள் சாதனத்தின் கோப்புகளிலிருந்து பாதத்தின் படத்தைப் பதிவேற்றவும்.'
        : 'Unable to access camera directly. Please upload an image from your device.';

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        message = isTa
          ? 'கேமரா அனுமதி மறுக்கப்பட்டது. உலாவியில் கேமரா அனுமதியை இயக்கவும் அல்லது கீழே உள்ள "படத்தைப் பதிவேற்றவும்" பொத்தானைப் பயன்படுத்தவும்.'
          : 'Camera permission was denied. Please allow camera access in your browser or use the "Upload Image" option below.';
      }

      setCameraError(message);
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setPreviewImage(dataUrl);
    stopCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(isTa ? 'தயவுசெய்து புகைப்படத்தை (JPEG, PNG) பதிவேற்றவும்.' : 'Please upload an image file (JPEG, PNG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreviewImage(result);
        stopCamera();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  const handlePresetSelect = (preset: TestPreset) => {
    setSelectedPresetId(preset.id);
    const dataUrl = preset.generateDataUrl();
    setPreviewImage(dataUrl);
    stopCamera();
  };

  const confirmAndAnalyze = () => {
    if (previewImage) {
      onImageSelected(previewImage);
    }
  };

  const handleReset = () => {
    setPreviewImage(null);
    setSelectedPresetId(null);
    setCameraError(null);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="space-y-8">
      {/* Step Guide Bar */}
      <div className="bg-white border border-emerald-100 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between max-w-3xl mx-auto text-xs sm:text-sm font-semibold text-slate-500">
          <div className="flex items-center gap-2 text-emerald-800">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              1
            </span>
            <span>{t.step1}</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-emerald-200"></div>
          <div className={`flex items-center gap-2 ${previewImage ? 'text-emerald-800' : 'text-slate-400'}`}>
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                previewImage ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              2
            </span>
            <span>{t.step2}</span>
          </div>
          <div className="w-8 sm:w-16 h-0.5 bg-emerald-200"></div>
          <div className={`flex items-center gap-2 ${isAnalyzing ? 'text-emerald-800 font-bold' : 'text-slate-400'}`}>
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isAnalyzing ? 'bg-emerald-600 text-white animate-pulse' : 'bg-slate-200 text-slate-600'
              }`}
            >
              3
            </span>
            <span>{t.step3}</span>
          </div>
        </div>
      </div>

      {/* Main Scanner Container */}
      <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-70 pointer-events-none"></div>

        {!previewImage && !cameraActive && (
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isTa ? 'ஆரம்பநிலை காட்சிப் பரிசோதனை' : 'Preliminary Visual AI Screening'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.scanTitle}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {t.scanDesc}
            </p>

            {cameraError && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm text-left flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-0.5">{isTa ? 'கேமரா அறிவிப்பு' : 'Camera Notice'}</p>
                  <p>{cameraError}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={() => startCamera()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-700/25 flex items-center justify-center gap-2.5 transition-all hover:scale-102 focus:outline-hidden"
              >
                <Camera className="w-5 h-5" />
                <span>{t.btnCamera}</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all focus:outline-hidden"
              >
                <Upload className="w-5 h-5 text-emerald-600" />
                <span>{t.btnUpload}</span>
              </button>
            </div>

            {/* Hidden Inputs for Desktop & Mobile capture */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              capture="environment"
              className="hidden"
            />

            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 cursor-pointer transition-all ${
                isDragOver
                  ? 'border-emerald-500 bg-emerald-50/80 scale-101'
                  : 'border-slate-200 hover:border-emerald-400 bg-slate-50/50'
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                <FileImage className="w-8 h-8 text-emerald-600" />
                <p className="text-xs sm:text-sm font-medium">
                  {t.dragDropText} <span className="text-emerald-700 font-bold underline">{t.browseFiles}</span>
                </p>
                <p className="text-[11px] text-slate-400">{t.dragDropSub}</p>
              </div>
            </div>
          </div>
        )}

        {/* Live Camera Viewport */}
        {cameraActive && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-4/3 sm:aspect-16/10 shadow-lg border-2 border-emerald-500">
              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />

              {/* Target Reticle */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                <div className="w-full h-full border-2 border-dashed border-emerald-400/70 rounded-2xl relative flex items-center justify-center">
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-emerald-400"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-emerald-400"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-emerald-400"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-emerald-400"></div>

                  <div className="text-center bg-slate-900/80 backdrop-blur-xs text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-emerald-500/40">
                    {t.reticleGuide}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {hasMultipleCameras && (
                  <button
                    onClick={toggleFacingMode}
                    className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 transition-all focus:outline-hidden"
                    title={t.btnSwitchCam}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={stopCamera}
                  className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white text-xs font-semibold border border-white/20 transition-all focus:outline-hidden"
                >
                  {t.btnCancel}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={capturePhoto}
                className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-700/30 flex items-center gap-3 transition-all hover:scale-103 active:scale-98 focus:outline-hidden"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-white animate-ping"></div>
                <Camera className="w-6 h-6" />
                <span>{t.btnCapture}</span>
              </button>
            </div>
          </div>
        )}

        {/* Preview Frame Confirmation */}
        {previewImage && !isAnalyzing && (
          <div className="max-w-xl mx-auto space-y-5">
            <div className="text-center space-y-1">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {t.readyForScreening}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                {t.confirmClarity}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {t.confirmDesc}
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-emerald-400 shadow-md aspect-4/3 sm:aspect-16/10 flex items-center justify-center">
              <img
                src={previewImage}
                alt="Captured Foot Preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isTa ? 'தேர்வு செய்யப்பட்ட படம்' : 'Captured Frame'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={confirmAndAnalyze}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-700/30 flex items-center justify-center gap-2.5 transition-all hover:scale-102 focus:outline-hidden"
              >
                <Sparkles className="w-5 h-5 text-emerald-200" />
                <span>{t.btnAnalyze}</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all focus:outline-hidden"
              >
                <RefreshCw className="w-4 h-4 text-slate-500" />
                <span>{t.btnRetake}</span>
              </button>
            </div>
          </div>
        )}

        {/* Scanning in progress animation */}
        {isAnalyzing && (
          <div className="max-w-xl mx-auto py-10 text-center space-y-6">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-2xl overflow-hidden bg-slate-900 border-2 border-emerald-500 shadow-xl shadow-emerald-600/15">
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Analyzing foot"
                  className="w-full h-full object-cover opacity-60 filter brightness-90"
                />
              )}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 shadow-[0_0_15px_#10b981] animate-scan-line"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span>{isTa ? 'AI பரிசோதனை நடைபெறுகிறது...' : 'AI Vision Engine Active'}</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {t.analyzingTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                {t.analyzingDesc}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preset Test Samples Gallery */}
      <div className="bg-white border border-emerald-100 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>{t.galleryTitle}</span>
            </h3>
            <p className="text-xs text-slate-500">{t.galleryDesc}</p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
            {isTa ? 'சோதனை மாதிரிகள்' : 'Standard Evaluation Cases'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SAMPLE_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            const badgeColor =
              preset.expectedResult === 'NORMAL'
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                : preset.expectedResult === 'ABNORMAL'
                ? 'bg-red-100 text-red-800 border-red-200'
                : 'bg-amber-100 text-amber-800 border-amber-200';

            return (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${badgeColor}`}>
                      {preset.expectedResult}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {isTa ? 'கிளிக் செய்க' : 'Click to Load'}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mb-1">{preset.name}</h4>
                  <p className="text-[11px] text-slate-500 leading-snug">{preset.description}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.testSampleBtn}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
