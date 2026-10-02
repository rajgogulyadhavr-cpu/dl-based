# FootGuard AI – Preliminary Diabetic Foot Ulcer (DFU) Screening System

> **Preliminary Visual AI Screening & Awareness Platform for Diabetic Foot Wellness**  
> *Developed with a clean medical White + Green aesthetic and complete English + தமிழ் (Tamil) bilingual support.*

---

## 🩺 Overview

**FootGuard AI** is a specialized preliminary visual screening and awareness web application designed to help individuals living with diabetes perform routine visual foot inspections. 

Due to **diabetic peripheral neuropathy**, patients frequently lose protective sensation in their lower extremities, allowing small blisters, cracks, or pressure calluses to develop into dangerous, limb-threatening **Diabetic Foot Ulcers (DFU)** without causing noticeable pain. FootGuard AI bridges the gap between daily self-monitoring and clinical limb salvage care.

> ⚠️ **Important Medical Disclaimer**: FootGuard AI is an automated preliminary screening prototype, not a medical diagnostic system. An image-based AI screening tool cannot confirm a medical diagnosis. Always consult a qualified podiatrist or healthcare provider for clinical diagnosis and treatment.

---

## ✨ Key Features

### 1. 📷 Calibrated Visual AI Screening
- **Real-Time Camera & Upload**: Seamlessly captures mobile/desktop camera photos or accepts JPEG/PNG uploads.
- **5-Step Decision Pipeline**:
  1. Image validation & input sanitization.
  2. Quality verification (detects extreme blur via Laplacian variance, severe underexposure, and human skin chrominance).
  3. Dermal integrity assessment.
  4. Localized open wound / ulcer crater detection.
  5. Strict Safety Rules:
     - **No obvious wound** $\rightarrow$ **🟢 NORMAL / NO OBVIOUS VISIBLE ULCER**
     - **Clearly visible wound** $\rightarrow$ **🔴 ABNORMAL / POSSIBLE DFU**
     - **Unusable / blurry / dark / non-foot** $\rightarrow$ **🟡 LOW QUALITY / RECAPTURE IMAGE**
- **Zero Fabricated Observations**: Never hallucinates medical terms (like *"erythema"* or *"dermal discontinuity"*) on healthy skin, calluses, or shadows.
- **Diagnostic Test Gallery**: Preloaded with standardized evaluation samples (Healthy Plantar, Healthy Dorsal, Diabetic Metatarsal Ulcer, Blurry Image, Non-Foot Item) for 1-click pipeline verification.

### 2. 🌐 Global English | தமிழ் (Tamil) Bilingual Support
- Instant, persistent language toggle across the entire application.
- Comprehensive, natural Tamil translations for all navigation, camera instructions, screening observations, DFU warning signs, Indian diet cards, Tamil Nadu hospital directories, and Kurai AI interactions.

### 3. 🏥 Tamil Nadu Healthcare Directory
- Dedicated directory of verified diabetic foot and wound care facilities across major Tamil Nadu districts:
  - **Government Medical College Hospitals**: RGGGH Chennai, Stanley Hospital, Madurai GRH, Coimbatore CMCH, KAP Viswanatham Trichy, Salem, and Tirunelveli.
  - **Specialized Private Centers**: Dr. Mohan's Diabetes Specialities Centre, CMC Vellore, Ganga Hospital Coimbatore, Apollo Sugar Clinics, Kauvery Hospital Trichy, Meenakshi Mission Madurai, CFH Dindigul, and more.
  - Filter by city/district and sector (*Government vs. Private*).
  - Verified addresses, department details, phone numbers, and direct **Google Maps directions**.
  - **Emergency Hotline**: Integrated 108 / 112 Tamil Nadu ambulance triage guidance.

### 4. 🥗 Indian Diabetic Food Guide
- Culturally authentic, evidence-based nutrition guide grounded in traditional South Indian ingredients:
  - **Prefer / Include Often**: Murungai keerai, palak, whole millets (kuthiraivali, thinai, ragi), lentils/sundal (moong dal, chana), non-starchy country vegetables (bitter gourd, okra, bottle gourd), country eggs, fish, curd, and amla/guava.
  - **Limit / In Moderation**: Polished white rice (Ponni), wheat rotis, and starchy tubers.
  - **Avoid / Minimize**: Refined white sugar, traditional sweets (laddu, halwa), maida preparations (parotta), carbonated sodas, and deep-fried bajjis.
  - **The 50-25-25 Diabetic Plate Method**: 50% non-starchy vegetables/greens + 25% lean protein + 25% whole grains.
  - **Hydration Guidelines**: Spiced buttermilk (more), coriander water, and daily fluid advice.

### 5. 🔍 DFU – Know the Signs (Educational Guide)
- 13 structured educational modules explaining what a diabetic foot ulcer is without graphic/gory imagery:
  1. What is DFU?
  2. Common warning signs
  3. What a concerning wound looks like
  4. Redness around a wound (*Cellulitis*)
  5. Swelling (*Edema*)
  6. Discharge & foul odor
  7. Skin breakdown & interdigital maceration
  8. Persistent non-healing wounds
  9. Changes in skin color (*Black / Blue / Pale*)
  10. Foot pain & numbness (*Neuropathy*)
  11. When to seek immediate emergency care
  12. Why early evaluation matters for limb salvage
  13. Basic foot-care precautions

### 6. 🛡️ Evidence-Based Do & Don’t Protocols
- Practical daily hygiene guidelines referencing IWGDF 2023 and ADA standards:
  - **DOs**: Daily inspection with mirror, washing and thorough drying (especially between toes), proper wide-toed footwear, seamless socks, and early medical reporting.
  - **DON'Ts**: Never walk barefoot anywhere, never attempt "bathroom surgery" on calluses with blades or acid pads, never ignore painless blisters.

### 7. 💬 Kurai AI Clinical Companion
- Empathetic AI health advisor supporting both English and Tamil.
- Answers questions regarding daily foot routines, footwear selection, nutrition, and urgent red flag symptoms.
- Features resilient timeout protection with native clinical rulebase fallback.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons
- **Backend & Full-Stack Entry**: Express, Node.js 22, `tsx`
- **Vision & AI Pipeline**: `@google/genai` (Gemini 3.5 Flash) with strict structured JSON schema + Client-side computer vision chrominance & edge gradient fallback
- **Build & Bundle**: Vite 8, esbuild

---

## 📂 Project Architecture

```
├── .env.example                      # Environment variables template
├── .gitignore                        # Git exclusion rules
├── index.html                        # HTML entry point with medical metadata
├── metadata.json                     # AI Studio applet capabilities
├── package.json                      # Dependencies and scripts
├── server.ts                         # Express server with Vite middleware & API routes
├── tsconfig.json                     # TypeScript compiler configuration
├── vite.config.ts                    # Vite build configuration
└── src
    ├── App.tsx                       # Main application router and state management
    ├── main.tsx                      # React root rendering entry point
    ├── index.css                     # Global styles and scanning animation keyframes
    ├── types.ts                      # Shared TypeScript definitions
    ├── i18n
    │   └── translations.ts           # Comprehensive English & Tamil dictionaries
    ├── data
    │   ├── tamilNaduHospitals.ts     # Verified Tamil Nadu healthcare centers
    │   ├── indianDietData.ts         # Indian food guide, meal ideas & hydration
    │   ├── dfuEducationalData.ts     # 13 DFU warning sign modules
    │   ├── footCareGuidelines.ts     # Evidence-based Do's & Don'ts
    │   └── samplePresets.ts          # Realistic test gallery presets
    ├── components
    │   ├── Header.tsx                # Healthcare navbar with logo & EN/தமிழ் toggle
    │   ├── Footer.tsx                # Medical disclaimer, guidelines & ambulance hotline
    │   ├── CameraScanner.tsx         # Real-time camera viewfinder & file upload
    │   ├── ResultCard.tsx            # Standardized, non-hallucinating result display
    │   ├── DFUSignsPage.tsx          # Educational signs and warning symptoms page
    │   ├── IndianDietPage.tsx        # Visual Indian nutrition & plate method page
    │   ├── TamilNaduHealthcarePage.tsx # Tamil Nadu hospital referral directory
    │   ├── DoAndDontSection.tsx      # Daily foot-care protocols page
    │   └── KuraiAIAssistant.tsx      # Bilingual Kurai AI chat assistant
    └── utils
        ├── imageAnalyzer.ts          # 5-step non-hallucinating computer vision analyzer
        ├── clinicalAdvisor.ts        # Evidence-based bilingual clinical advisor engine
        └── localClassifier.ts        # Resilient classifier bridge
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- npm or bun

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
Ensure your `GEMINI_API_KEY` is configured:
```env
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Development Server
Start the full-stack development server on port 3000:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Production Build
Build the optimized client bundle and server executable:
```bash
npm run build
```
To run the production server:
```bash
npm start
```

---

## 📜 Clinical Attribution & Sources

- **IWGDF Guidelines 2023**: International Working Group on the Diabetic Foot – Guidelines on the Prevention and Management of Diabetic Foot Disease.
- **ADA Standards of Care**: American Diabetes Association – Standards of Medical Care in Diabetes.
- **APMA**: American Podiatric Medical Association – Diabetic Foot Health Standards.

---

## 📄 License

Apache-2.0 License. Built for diabetic foot wellness and public health awareness.
