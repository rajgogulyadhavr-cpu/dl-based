export type Language = 'en' | 'ta';

export type ScreeningPrediction = 'normal' | 'abnormal' | 'uncertain';
export type ScreeningLabel = 'NORMAL' | 'POSSIBLE_DFU' | 'LOW_QUALITY';

export interface QualityAssessment {
  isClear: boolean;
  lighting: 'good' | 'adequate' | 'poor';
  isFoot: boolean;
  issue?: string;
}

export interface ScreeningResult {
  status: 'success' | 'error';
  prediction: ScreeningPrediction;
  label: ScreeningLabel;
  confidence: number;
  message: string;
  observations: string[];
  qualityCheck: QualityAssessment;
  riskLevel: 'low' | 'high' | 'undetermined';
  immediateRecommendations: string[];
  timestamp: string;
  imagePreviewUrl: string;
}

export interface HospitalCenter {
  id: string;
  name: string;
  nameTa?: string;
  sector: 'Government' | 'Private';
  type: 'Government Medical College Hospital' | 'Specialized Diabetes Center' | 'Multispecialty Hospital' | 'Wound Care & Podiatry Clinic';
  city: 'Chennai' | 'Coimbatore' | 'Madurai' | 'Tiruchirappalli' | 'Salem' | 'Tirunelveli' | 'Thanjavur' | 'Erode' | 'Vellore' | 'Dindigul';
  district: string;
  department: string;
  departmentTa?: string;
  address: string;
  phone: string;
  emergencyPhone?: string;
  website?: string;
  services: string[];
  servicesTa?: string[];
  directionsQuery: string;
  isVerified: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  nameTa: string;
  category: 'prefer' | 'limit' | 'avoid';
  portionNote: string;
  portionNoteTa: string;
  explanation: string;
  explanationTa: string;
  glycemicImpact: 'Low GI' | 'Medium GI' | 'High GI';
  iconType: string;
}

export interface DFUSignItem {
  id: string;
  title: string;
  titleTa: string;
  shortDesc: string;
  shortDescTa: string;
  details: string[];
  detailsTa: string[];
  urgency: 'routine' | 'urgent' | 'emergency';
  badgeText: string;
  badgeTextTa: string;
}

export interface FootCareItem {
  id: string;
  type: 'do' | 'dont';
  title: string;
  titleTa?: string;
  summary: string;
  summaryTa?: string;
  detailedGuidance: string[];
  detailedGuidanceTa?: string[];
  medicalRationale: string;
  medicalRationaleTa?: string;
  category: 'hygiene' | 'inspection' | 'footwear' | 'medical';
  badge: string;
  source: string;
}

export interface ClinicProvider {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  urgencyLevel: string;
  distance?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'kurai';
  text: string;
  timestamp: string;
}
