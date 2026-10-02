import { Language } from '../types';

export const TRANSLATIONS = {
  en: {
    // Brand
    brandName: 'FOOTGUARD AI',
    brandSubtitle: 'Preliminary Diabetic Foot Ulcer (DFU) Screening',

    // Nav
    navScreening: 'Screening',
    navSigns: 'DFU Signs',
    navDiet: 'Indian Diet',
    navDoDont: 'Do & Don’t',
    navHealthcare: 'TN Healthcare',
    navKurai: 'Kurai AI',

    // Hero
    heroBadge: 'Diabetic Limb Wellness & Visual Awareness',
    heroTitle: 'Smart Preliminary Screening for Foot Health',
    heroDesc: 'Diabetic foot ulcers frequently develop without pain due to sensory neuropathy. FootGuard AI provides early visual inspection to differentiate healthy intact skin from ulcerations and suspicious open lesions.',
    badgeCamera: 'Real-time Camera Compatible',
    badgeSafety: 'Non-Diagnostic Screening Rule',
    badgeReferral: 'Tamil Nadu Clinical Directory',

    // Steps
    step1: 'Capture or Upload',
    step2: 'Preview Frame',
    step3: 'AI Screening',

    // Scanner
    scanTitle: 'Scan Your Foot for AI Screening',
    scanDesc: 'Position your foot under adequate natural or clinical lighting. Ensure the sole, top, or toes are in clear focus with no heavy shadows.',
    btnCamera: 'Open Camera',
    btnUpload: 'Upload Image',
    dragDropText: 'Drag and drop a clear foot photo here, or',
    browseFiles: 'browse files',
    dragDropSub: 'Supports complete plantar sole, dorsal top, or heel views (JPEG, PNG)',
    reticleGuide: 'Align your entire foot within this frame under clear light',
    btnCapture: 'Capture Foot Image',
    btnSwitchCam: 'Switch Camera',
    btnCancel: 'Cancel',

    // Preview
    readyForScreening: 'Image Ready for AI Screening',
    confirmClarity: 'Confirm Image Clarity',
    confirmDesc: 'Ensure the full foot is visible, well focused, and not cast in deep shadow.',
    btnAnalyze: 'Run AI Screening',
    btnRetake: 'Retake / Change Photo',
    analyzingTitle: 'Evaluating Foot Dermis & Wound Markers...',
    analyzingDesc: 'Inspecting visual features for intact healthy skin versus visible wounds, ulcerations, or skin breakdown.',

    // Quality check
    qualityTitle: 'Image Quality Check',
    qualityInsufficient: 'Image quality is insufficient for screening.',
    qualityInsufficientDesc: 'Please capture a clear image of the foot under good lighting.',
    qualityIssueBlur: 'Severe blur or motion streak detected.',
    qualityIssueDark: 'Image is too dark or underexposed.',
    qualityIssueNonFoot: 'No clear human foot anatomy was identified.',

    // Results
    resultNormalLabel: 'NORMAL / NO OBVIOUS VISIBLE ULCER',
    resultNormalTitle: 'Normal-Looking Foot Appearance',
    resultNormalSummary: 'Normal-looking foot appearance detected by preliminary AI screening. No obvious visible wound or ulcer-like lesion was detected in the uploaded image.',

    resultAbnormalLabel: 'ABNORMAL / POSSIBLE DFU',
    resultAbnormalTitle: 'Visible Wound / Ulcer-Like Lesion Detected',
    resultAbnormalSummary: 'An abnormal wound/ulcer-like visual pattern was detected. Professional medical evaluation is recommended.',

    resultUncertainLabel: 'LOW QUALITY / RECAPTURE IMAGE',
    resultUncertainTitle: 'Image Quality Insufficient for Screening',
    resultUncertainSummary: 'Please capture a clear image of the foot under good lighting. The image was either out of focus, severely dark, or poorly framed.',

    obsTitle: 'Preliminary Screening Observations',
    recTitle: 'Recommended Actions',

    // Result Buttons
    btnScanAgain: 'SCAN AGAIN',
    btnFootCare: 'FOOT CARE GUIDE',
    btnFindHealthcare: 'FIND HEALTHCARE',
    btnAskKurai: 'ASK KURAI AI',
    btnRecapture: 'RETAKE PHOTO',
    btnUploadAnother: 'UPLOAD ANOTHER IMAGE',

    // Test Gallery
    galleryTitle: 'Diagnostic Pipeline Test Gallery',
    galleryDesc: 'Test FootGuard AI’s calibrated screening model with realistic full-foot evaluation samples:',
    testSampleBtn: 'Test this sample',

    // Disclaimer
    disclaimerTitle: 'Important Preliminary Screening Disclaimer',
    disclaimerText: 'FootGuard AI is an automated preliminary screening prototype, not a medical diagnosis system. An image-based AI screening tool cannot confirm a medical diagnosis. Always consult a qualified podiatrist or healthcare provider.',

    // Footer
    footerMission: 'Designed to help people living with diabetes perform routine visual foot inspections and bridge the gap between daily self-monitoring and clinical limb salvage care.',
    footerHotline: 'Emergency Ambulance: 108 / 112 (Tamil Nadu)',
  },

  ta: {
    // Brand
    brandName: 'ஃபுட்கார்ட் AI',
    brandSubtitle: 'நீரிழிவு பாதப் புண் (DFU) ஆரம்பநிலை பரிசோதனை',

    // Nav
    navScreening: 'பரிசோதனை',
    navSigns: 'DFU அறிகுறிகள்',
    navDiet: 'உணவு முறை',
    navDoDont: 'செய்ய வேண்டியவை',
    navHealthcare: 'தமிழக மருத்துவமனைகள்',
    navKurai: 'குரல் AI',

    // Hero
    heroBadge: 'நீரிழிவு பாதப் பாதுகாப்பு & விழிப்புணர்வு',
    heroTitle: 'ஆரோக்கியமான பாதங்களுக்கான நவீன AI பரிசோதனை',
    heroDesc: 'நீரிழிவு நரம்புப் பாதிப்பால் பாதங்களில் ஏற்படும் புண்கள் பெரும்பாலும் வலி இல்லாமலே உருவாகின்றன. ஃபுட்கார்ட் AI மூலம் உங்கள் பாதத்தில் புண்கள் ஏதேனும் உள்ளதா என்பதை ஆரம்பத்திலேயே படமெடுத்துக் கண்டறியலாம்.',
    badgeCamera: 'கேமரா மூலம் படம் எடுக்கும் வசதி',
    badgeSafety: 'பாதுகாப்பான ஆரம்பநிலை பரிசோதனை',
    badgeReferral: 'தமிழ்நாடு மருத்துவமனை வழிகாட்டி',

    // Steps
    step1: 'படம் எடுக்கவும்',
    step2: 'சரிபார்க்கவும்',
    step3: 'AI பரிசோதனை',

    // Scanner
    scanTitle: 'பாதத்தைப் படமெடுத்து பரிசோதிக்கவும்',
    scanDesc: 'நல்ல வெளிச்சத்தில் பாதத்தின் அடிப்பகுதி, மேற்பகுதி அல்லது விரல்கள் தெளிவாகத் தெரியும்படி கேமராவில் படம் பிடிக்கவும் அல்லது பதிவேற்றவும்.',
    btnCamera: 'கேமராவைத் திறக்கவும்',
    btnUpload: 'படத்தைப் பதிவேற்றவும்',
    dragDropText: 'பாதத்தின் படத்தை இங்கே இழுத்துப் போடவும், அல்லது',
    browseFiles: 'கோப்புகளைத் தேர்வு செய்யவும்',
    dragDropSub: 'முழு உள்ளங்கால், முன்கால், அல்லது குதிகால் படங்கள் (JPEG, PNG)',
    reticleGuide: 'நல்ல வெளிச்சத்தில் பாதத்தை இந்த கட்டத்திற்குள் வைக்கவும்',
    btnCapture: 'படம் எடுக்கவும்',
    btnSwitchCam: 'கேமராவை மாற்றவும்',
    btnCancel: 'ரத்து செய்',

    // Preview
    readyForScreening: 'பரிசோதனைக்குத் தயார்',
    confirmClarity: 'படத்தின் தெளிவை உறுதிப்படுத்தவும்',
    confirmDesc: 'பாதம் முழுமையாக, மங்கலாகாமல், போதுமான வெளிச்சத்தில் உள்ளதா என்று பார்க்கவும்.',
    btnAnalyze: 'AI பரிசோதனையைத் தொடங்கவும்',
    btnRetake: 'மீண்டும் படம் எடுக்கவும்',
    analyzingTitle: 'பாதத்தின் தோல் மற்றும் புண்களைப் பரிசோதிக்கிறது...',
    analyzingDesc: 'தோலின் ஆரோக்கியம், காயங்கள், வெடிப்புகள் மற்றும் புண்களை AI நுட்பத்துடன் ஆராய்கிறது.',

    // Quality check
    qualityTitle: 'படத்தின் தரப் பரிசோதனை',
    qualityInsufficient: 'பரிசோதனை செய்வதற்கு படத்தின் தரம் போதாது.',
    qualityInsufficientDesc: 'நல்ல வெளிச்சத்தில் பாதத்தை மங்கலின்றி தெளிவாக மீண்டும் படம் எடுக்கவும்.',
    qualityIssueBlur: 'படம் அதிக மங்கலாக உள்ளது.',
    qualityIssueDark: 'படத்தில் வெளிச்சம் மிகவும் குறைவாக உள்ளது.',
    qualityIssueNonFoot: 'மனித பாதம் தெளிவாக அடையாளம் காணப்படவில்லை.',

    // Results
    resultNormalLabel: 'இயல்பானது / வெளிப்படையான புண்கள் இல்லை',
    resultNormalTitle: 'பாதத்தின் தோற்றம் இயல்பாக உள்ளது',
    resultNormalSummary: 'ஆரம்பநிலை AI பரிசோதனையில் பாதம் இயல்பாகத் தெரிகிறது. பதிவேற்றப்பட்ட படத்தில் வெளிப்படையான வெட்டுக் காயங்களோ அல்லது புண்களோ தென்படவில்லை.',

    resultAbnormalLabel: 'புண் தென்படுகிறது / DFU சாத்தியம்',
    resultAbnormalTitle: 'காயம் அல்லது புண் போன்ற தோற்றம் கண்டறியப்பட்டது',
    resultAbnormalSummary: 'பாதத்தில் புண் அல்லது காயம் போன்ற அசாதாரண தோற்றம் கண்டறியப்பட்டுள்ளது. தகுதியான மருத்துவரை அணுகி முழு பரிசோதனை செய்ய பரிந்துரைக்கப்படுகிறது.',

    resultUncertainLabel: 'குறைந்த தரம் / மீண்டும் படம் எடுக்கவும்',
    resultUncertainTitle: 'படத்தின் தரம் போதுமானதாக இல்லை',
    resultUncertainSummary: 'நல்ல வெளிச்சத்தில் பாதத்தை மங்கலின்றி மீண்டும் படம் எடுக்கவும். படம் மங்கலாகவோ அல்லது மிகவும் இருட்டாகவோ உள்ளது.',

    obsTitle: 'பரிசோதனை அவதானிப்புகள்',
    recTitle: 'பரிந்துரைக்கப்படும் நடவடிக்கைகள்',

    // Result Buttons
    btnScanAgain: 'மீண்டும் பரிசோதிக்கவும்',
    btnFootCare: 'பாதப் பராமரிப்பு முறை',
    btnFindHealthcare: 'மருத்துவமனையைக் கண்டறியவும்',
    btnAskKurai: 'குரல் AI-யிடம் கேட்கவும்',
    btnRecapture: 'மீண்டும் படம் எடுக்கவும்',
    btnUploadAnother: 'வேறு படத்தை பதிவேற்றவும்',

    // Test Gallery
    galleryTitle: 'பரிசோதனை மாதிரி படங்கள்',
    galleryDesc: 'மாதிரி படங்களைக் கொண்டு ஃபுட்கார்ட் AI எவ்வாறு செயல்படுகிறது என்பதைச் சோதித்துப் பார்க்கவும்:',
    testSampleBtn: 'இப்படத்தைச் சோதிக்கவும்',

    // Disclaimer
    disclaimerTitle: 'முக்கிய ஆரம்பநிலை பரிசோதனை அறிவிப்பு',
    disclaimerText: 'ஃபுட்கார்ட் AI என்பது ஒரு முதற்கட்ட விழிப்புணர்வு மற்றும் ஆரம்பநிலை பரிசோதனை மட்டுமே. இது மருத்துவ நோயறிதல் அல்ல. AI பரிசோதனை மூலம் இறுதி முடிவெடுக்க முடியாது. பாதத்தில் ஏதேனும் மாற்றம் தென்பட்டால் உடனடியாக மருத்துவரை அணுகவும்.',

    // Footer
    footerMission: 'நீரிழிவு நோயாளிகள் தினமும் தங்கள் பாதங்களைப் பாதுகாக்கவும், பாதப் புண்களை ஆரம்பத்திலேயே தவிர்த்து கால்களைப் பாதுகாக்கவும் இந்தத் தளம் உருவாக்கப்பட்டுள்ளது.',
    footerHotline: 'அவசர ஆம்புலன்ஸ் எண்: 108 / 112 (தமிழ்நாடு)',
  },
};

export function getTranslation(lang: Language) {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
