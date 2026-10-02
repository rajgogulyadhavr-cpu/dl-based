import { ClinicProvider } from '../types';

export const CLINIC_PROVIDERS: ClinicProvider[] = [
  {
    id: 'clinic-1',
    name: 'Advanced Center for Diabetic Foot & Wound Care',
    type: 'Wound Care Center',
    address: 'Medical Pavilion Suite 400, Metro Health Campus',
    phone: '(800) 555-DFU1',
    hours: 'Mon-Fri 7:30 AM - 6:00 PM (Emergency on-call 24/7)',
    services: [
      'Hyperbaric Oxygen Therapy (HBOT)',
      'Surgical Ulcer Debridement',
      'Advanced Bio-engineered Skin Substitutes',
      'Vascular Flow Doppler Assessment',
      'Total Contact Casting (TCC)',
    ],
    urgencyLevel: 'Emergency',
    distance: '2.4 miles away',
  },
  {
    id: 'clinic-2',
    name: 'Metropolitan Podiatric Medicine & Limb Salvage',
    type: 'Podiatry Specialty',
    address: '840 Wellness Parkway, Level 2',
    phone: '(800) 555-FEET',
    hours: 'Mon-Sat 8:00 AM - 5:00 PM',
    services: [
      'Comprehensive Diabetic Foot Risk Scoring',
      'Custom Orthotic Offloading & Diabetic Shoes',
      'Nail & Callus Safe Clinical Debridement',
      'Neuropathy Monofilament & Biothesiometry',
    ],
    urgencyLevel: 'Same-Day Urgent',
    distance: '4.1 miles away',
  },
  {
    id: 'clinic-3',
    name: 'University Hospital Diabetic Limb Preservation Unit',
    type: 'Hospital Diabetic Foot Unit',
    address: '1200 University Medical Center Boulevard',
    phone: '(800) 555-LIMB',
    hours: '24/7 Emergency Department & Urgent Wound Intake',
    services: [
      'Multi-disciplinary Limb Salvage Surgery',
      'Emergency Vascular Revascularization (Angioplasty)',
      'Infectious Disease & IV Antibiotic Management',
      'Advanced 3D Plantar Pressure Mapping',
    ],
    urgencyLevel: 'Emergency',
    distance: '6.8 miles away',
  },
  {
    id: 'clinic-4',
    name: 'Community Health Diabetic Wellness & Foot Clinic',
    type: 'Podiatry Specialty',
    address: '350 Community Drive, Suite 102',
    phone: '(800) 555-CARE',
    hours: 'Mon-Thu 8:30 AM - 4:30 PM',
    services: [
      'Preventative Routine Foot Screenings',
      'Medicare Diabetic Shoe Fitting Program',
      'Patient Education & Neuropathy Self-Care Classes',
      'Wound Dressing Supply Coordination',
    ],
    urgencyLevel: 'Appointment Scheduled',
    distance: '8.2 miles away',
  },
];

export const RED_FLAG_SYMPTOMS = [
  {
    title: 'Spreading Redness & Heat (Cellulitis)',
    description: 'Redness that expands more than 2 cm around a lesion or streak up the foot/leg indicates rapid bacterial spread.',
    level: 'Emergency: Seek Emergency Medical Evaluation',
  },
  {
    title: 'Black / Gray Skin (Tissue Necrosis / Gangrene)',
    description: 'Darkened, blackened tissue or sudden cold pale toes indicates severe critical limb ischemia requiring immediate vascular triage.',
    level: 'Emergency: Immediate Hospital Visit',
  },
  {
    title: 'Foul-Smelling Drainage or Purulent Pus',
    description: 'Active yellow/green fluid oozing from a crack, callus, or sore indicates deep subcutaneous infection.',
    level: 'Urgent: Same-Day Podiatric or Clinic Evaluation',
  },
  {
    title: 'Systemic Fever, Chills, or High Blood Sugars',
    description: 'Unexplained spikes in blood glucose accompanied by chills or fever often signal occult deep space foot infection.',
    level: 'Emergency: Seek Emergency Department Care',
  },
];
