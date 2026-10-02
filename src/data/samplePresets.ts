/**
 * High-fidelity test samples generator for FootGuard AI screening pipeline.
 * Generates realistic JPEG data URLs using HTML5 Canvas to test the AI model under:
 * - Clear Normal Healthy Foot (plantar & dorsal)
 * - Clear Diabetic Foot Ulcer (plantar metatarsal lesion)
 * - Clear Abnormal DFU wound on toe
 * - Blurry / Poor Lighting unusable image
 * - Non-foot object
 */

export interface TestPreset {
  id: string;
  name: string;
  category: 'Normal Foot' | 'Abnormal (DFU)' | 'Uncertain / Blurry';
  expectedResult: 'NORMAL' | 'ABNORMAL' | 'UNCERTAIN';
  description: string;
  generateDataUrl: () => string;
}

// Helper to draw realistic skin gradients and textures
function createSkinGradient(ctx: CanvasRenderingContext2D, width: number, height: number, tone: 'fair' | 'tan' | 'medium') {
  const grad = ctx.createRadialGradient(width * 0.45, height * 0.5, 40, width * 0.5, height * 0.5, width * 0.6);
  if (tone === 'fair') {
    grad.addColorStop(0, '#fde2d2');
    grad.addColorStop(0.6, '#f7caa9');
    grad.addColorStop(1, '#e3b28f');
  } else if (tone === 'tan') {
    grad.addColorStop(0, '#d89e77');
    grad.addColorStop(0.7, '#c28359');
    grad.addColorStop(1, '#9f643e');
  } else {
    grad.addColorStop(0, '#eac09d');
    grad.addColorStop(0.6, '#d9a781');
    grad.addColorStop(1, '#bf8963');
  }
  return grad;
}

/**
 * 1. Realistic Normal Plantar Foot View
 */
export function generateNormalPlantarFoot(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background: clean clinical examination sheet / floor
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, 600, 800);

  // Soft shadow under foot
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(300, 480, 180, 290, 0.05, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
  ctx.filter = 'blur(16px)';
  ctx.fill();
  ctx.restore();

  // Plantar foot silhouette
  ctx.save();
  ctx.beginPath();
  // Heel
  ctx.moveTo(270, 710);
  ctx.bezierCurveTo(200, 710, 190, 630, 200, 560);
  // Lateral arch
  ctx.bezierCurveTo(205, 490, 195, 380, 210, 310);
  // Metatarsal ball of foot
  ctx.bezierCurveTo(215, 260, 230, 210, 260, 200);
  // Base of toes
  ctx.bezierCurveTo(310, 190, 390, 220, 420, 250);
  // Medial arch
  ctx.bezierCurveTo(430, 340, 380, 470, 385, 570);
  // Inner heel
  ctx.bezierCurveTo(390, 650, 360, 710, 270, 710);
  ctx.closePath();

  ctx.fillStyle = createSkinGradient(ctx, 600, 800, 'medium');
  ctx.fill();
  ctx.strokeStyle = '#a67049';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Draw 5 healthy toes
  const toes = [
    { x: 260, y: 140, rx: 35, ry: 45, rot: -0.05 }, // Big toe
    { x: 320, y: 155, rx: 24, ry: 38, rot: 0.05 },  // Index toe
    { x: 365, y: 175, rx: 20, ry: 33, rot: 0.1 },   // Middle toe
    { x: 405, y: 200, rx: 18, ry: 28, rot: 0.15 },  // Fourth toe
    { x: 438, y: 230, rx: 15, ry: 24, rot: 0.2 },   // Pinky toe
  ];

  toes.forEach((t) => {
    ctx.beginPath();
    ctx.ellipse(t.x, t.y, t.rx, t.ry, t.rot, 0, Math.PI * 2);
    ctx.fillStyle = createSkinGradient(ctx, 600, 800, 'medium');
    ctx.fill();
    ctx.strokeStyle = '#a67049';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Natural dermal creases on toes
    ctx.beginPath();
    ctx.arc(t.x, t.y + 10, t.rx * 0.7, 0.2, Math.PI - 0.2);
    ctx.strokeStyle = 'rgba(148, 86, 47, 0.35)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Healthy plantar skin texture & normal physiological creases
  ctx.beginPath();
  ctx.moveTo(240, 290);
  ctx.quadraticCurveTo(320, 270, 400, 310);
  ctx.moveTo(250, 350);
  ctx.quadraticCurveTo(330, 340, 380, 380);
  ctx.moveTo(230, 620);
  ctx.quadraticCurveTo(290, 600, 350, 630);
  ctx.strokeStyle = 'rgba(148, 86, 47, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Normal healthy skin highlights (no ulcers, intact epidermis)
  ctx.beginPath();
  ctx.ellipse(280, 640, 50, 40, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.fill();

  ctx.restore();

  // Subtle clinical metadata timestamp watermark
  ctx.font = '12px sans-serif';
  ctx.fillStyle = 'rgba(100, 116, 139, 0.5)';
  ctx.fillText('CLINICAL TEST EVALUATION • FULL PLANTAR VIEW • INTACT DERMIS', 20, 780);

  return canvas.toDataURL('image/jpeg', 0.92);
}

/**
 * 2. Realistic Normal Dorsal Foot View
 */
export function generateNormalDorsalFoot(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 600, 800);

  // Soft shadow
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(300, 500, 170, 270, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
  ctx.filter = 'blur(16px)';
  ctx.fill();
  ctx.restore();

  // Foot dorsal contour
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(270, 760); // Ankle/leg
  ctx.lineTo(260, 620);
  ctx.bezierCurveTo(240, 520, 210, 400, 220, 320); // Outer foot
  ctx.bezierCurveTo(225, 250, 240, 200, 270, 190);
  ctx.bezierCurveTo(320, 180, 390, 210, 410, 240);
  ctx.bezierCurveTo(420, 320, 380, 470, 380, 620); // Inner foot & medial arch
  ctx.lineTo(370, 760);
  ctx.closePath();

  ctx.fillStyle = createSkinGradient(ctx, 600, 800, 'fair');
  ctx.fill();
  ctx.strokeStyle = '#b8835d';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Dorsal Toes with Healthy Nails
  const dorsalToes = [
    { x: 270, y: 135, rx: 34, ry: 42, rot: -0.05, nailW: 24, nailH: 20 },
    { x: 325, y: 150, rx: 24, ry: 36, rot: 0.04, nailW: 16, nailH: 15 },
    { x: 370, y: 170, rx: 20, ry: 32, rot: 0.1, nailW: 14, nailH: 14 },
    { x: 410, y: 195, rx: 18, ry: 27, rot: 0.15, nailW: 12, nailH: 12 },
    { x: 440, y: 225, rx: 15, ry: 23, rot: 0.2, nailW: 10, nailH: 10 },
  ];

  dorsalToes.forEach((t) => {
    // Toe body
    ctx.beginPath();
    ctx.ellipse(t.x, t.y, t.rx, t.ry, t.rot, 0, Math.PI * 2);
    ctx.fillStyle = createSkinGradient(ctx, 600, 800, 'fair');
    ctx.fill();
    ctx.strokeStyle = '#b8835d';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Healthy pinkish toenail
    ctx.beginPath();
    ctx.ellipse(t.x, t.y - 12, t.nailW * 0.6, t.nailH * 0.6, t.rot, 0, Math.PI * 2);
    ctx.fillStyle = '#fbcfe8';
    ctx.fill();
    ctx.strokeStyle = '#f472b6';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Natural toenail white lunula
    ctx.beginPath();
    ctx.arc(t.x, t.y - 6, t.nailW * 0.3, Math.PI * 0.8, Math.PI * 0.2, true);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();
  });

  // Normal healthy dorsal tendons and superficial veins (clean, not inflamed)
  ctx.beginPath();
  ctx.moveTo(320, 680);
  ctx.quadraticCurveTo(310, 520, 280, 240);
  ctx.moveTo(330, 680);
  ctx.quadraticCurveTo(335, 520, 330, 260);
  ctx.strokeStyle = 'rgba(180, 210, 230, 0.4)'; // faint bluish dorsal vein
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.restore();

  ctx.font = '12px sans-serif';
  ctx.fillStyle = 'rgba(100, 116, 139, 0.5)';
  ctx.fillText('CLINICAL TEST EVALUATION • DORSAL VIEW • HEALTHY INTEGUMENT', 20, 780);

  return canvas.toDataURL('image/jpeg', 0.92);
}

/**
 * 3. Realistic Abnormal Diabetic Foot Ulcer (Plantar Metatarsal Head Lesion)
 */
export function generateAbnormalDFUFoot(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, 600, 800);

  // Soft shadow
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(300, 480, 180, 290, 0.05, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
  ctx.filter = 'blur(16px)';
  ctx.fill();
  ctx.restore();

  // Plantar foot silhouette
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(270, 710);
  ctx.bezierCurveTo(200, 710, 190, 630, 200, 560);
  ctx.bezierCurveTo(205, 490, 195, 380, 210, 310);
  ctx.bezierCurveTo(215, 260, 230, 210, 260, 200);
  ctx.bezierCurveTo(310, 190, 390, 220, 420, 250);
  ctx.bezierCurveTo(430, 340, 380, 470, 385, 570);
  ctx.bezierCurveTo(390, 650, 360, 710, 270, 710);
  ctx.closePath();

  ctx.fillStyle = createSkinGradient(ctx, 600, 800, 'medium');
  ctx.fill();
  ctx.strokeStyle = '#a67049';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Toes
  const toes = [
    { x: 260, y: 140, rx: 35, ry: 45, rot: -0.05 },
    { x: 320, y: 155, rx: 24, ry: 38, rot: 0.05 },
    { x: 365, y: 175, rx: 20, ry: 33, rot: 0.1 },
    { x: 405, y: 200, rx: 18, ry: 28, rot: 0.15 },
    { x: 438, y: 230, rx: 15, ry: 24, rot: 0.2 },
  ];

  toes.forEach((t) => {
    ctx.beginPath();
    ctx.ellipse(t.x, t.y, t.rx, t.ry, t.rot, 0, Math.PI * 2);
    ctx.fillStyle = createSkinGradient(ctx, 600, 800, 'medium');
    ctx.fill();
    ctx.strokeStyle = '#a67049';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  });

  // VISIBLE DIABETIC FOOT ULCER (DFU) LESION at 1st Metatarsal Head (X: 285, Y: 295)
  const ulcerX = 285;
  const ulcerY = 295;

  // 1. Surrounding intense inflammatory erythema (red halo)
  const haloGrad = ctx.createRadialGradient(ulcerX, ulcerY, 15, ulcerX, ulcerY, 65);
  haloGrad.addColorStop(0, 'rgba(220, 38, 38, 0.7)');
  haloGrad.addColorStop(0.5, 'rgba(239, 68, 68, 0.45)');
  haloGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.beginPath();
  ctx.arc(ulcerX, ulcerY, 65, 0, Math.PI * 2);
  ctx.fillStyle = haloGrad;
  ctx.fill();

  // 2. Hyperkeratotic callous ring around ulcer crater
  ctx.beginPath();
  ctx.ellipse(ulcerX, ulcerY, 32, 28, 0.1, 0, Math.PI * 2);
  ctx.fillStyle = '#fde047'; // yellowish thickened callus rim
  ctx.fill();
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 3. Deep open ulcer crater with granulation & slough base
  ctx.beginPath();
  ctx.ellipse(ulcerX, ulcerY, 22, 19, 0.1, 0, Math.PI * 2);
  const craterGrad = ctx.createRadialGradient(ulcerX, ulcerY, 2, ulcerX, ulcerY, 20);
  craterGrad.addColorStop(0, '#991b1b'); // deep red center
  craterGrad.addColorStop(0.6, '#b91c1c'); // active granulation tissue
  craterGrad.addColorStop(0.85, '#fef08a'); // peripheral fibrin slough
  craterGrad.addColorStop(1, '#7f1d1d'); // rolled ulcer margin
  ctx.fillStyle = craterGrad;
  ctx.fill();
  ctx.strokeStyle = '#450a0a';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 4. Central deep fissure / exudative core
  ctx.beginPath();
  ctx.ellipse(ulcerX + 2, ulcerY - 1, 9, 6, 0.2, 0, Math.PI * 2);
  ctx.fillStyle = '#450a0a';
  ctx.fill();

  ctx.restore();

  ctx.font = '12px sans-serif';
  ctx.fillStyle = 'rgba(220, 38, 38, 0.7)';
  ctx.fillText('CLINICAL TEST EVALUATION • PLANTAR 1ST METATARSAL ULCERATION', 20, 780);

  return canvas.toDataURL('image/jpeg', 0.92);
}

/**
 * 4. Realistic Blurry / Poor Lighting / Unusable Image
 */
export function generateBlurryUnusableFoot(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Extremely dark and blurry background
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 600, 800);

  // Severe blur filter
  ctx.filter = 'blur(45px)';

  // Extremely faint out-of-focus blob with bad motion streak
  ctx.beginPath();
  ctx.ellipse(320, 420, 160, 240, 0.7, 0, Math.PI * 2);
  ctx.fillStyle = '#47362b';
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(260, 300, 90, 140, -0.4, 0, Math.PI * 2);
  ctx.fillStyle = '#654836';
  ctx.fill();

  // Lens flare / dark noise
  ctx.filter = 'none';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, 0, 600, 800);

  ctx.font = '13px sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillText('CLINICAL TEST EVALUATION • SEVERELY UNDEREXPOSED / DEFOCUSED ARTIFACT', 20, 780);

  return canvas.toDataURL('image/jpeg', 0.85);
}

export function generateNonFootObject(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Office desk with notebook and blue coffee mug (zero foot anatomy)
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, 0, 600, 800);

  // Wooden desk surface
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(50, 100, 500, 600);

  // Blue ceramic mug
  ctx.beginPath();
  ctx.arc(300, 400, 90, 0, Math.PI * 2);
  ctx.fillStyle = '#2563eb';
  ctx.fill();
  ctx.strokeStyle = '#1d4ed8';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Dark coffee inside
  ctx.beginPath();
  ctx.arc(300, 400, 65, 0, Math.PI * 2);
  ctx.fillStyle = '#451a03';
  ctx.fill();

  // Handle
  ctx.beginPath();
  ctx.arc(395, 400, 30, Math.PI * 1.5, Math.PI * 0.5);
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 14;
  ctx.stroke();

  ctx.font = '13px sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('NON-FOOT OBJECT • DESK ITEM (INVALID INPUT TEST)', 20, 780);

  return canvas.toDataURL('image/jpeg', 0.92);
}

export const SAMPLE_PRESETS: TestPreset[] = [
  {
    id: 'preset-normal-plantar',
    name: 'Healthy Normal Foot (Plantar Sole)',
    category: 'Normal Foot',
    expectedResult: 'NORMAL',
    description: 'Clear full-foot view of sole with intact skin, healthy dermis, no open wounds or ulcers.',
    generateDataUrl: generateNormalPlantarFoot,
  },
  {
    id: 'preset-normal-dorsal',
    name: 'Healthy Normal Foot (Dorsal Top)',
    category: 'Normal Foot',
    expectedResult: 'NORMAL',
    description: 'Clear complete view of top of foot and toes, normal toenails, intact skin barrier.',
    generateDataUrl: generateNormalDorsalFoot,
  },
  {
    id: 'preset-abnormal-dfu',
    name: 'Diabetic Foot Ulcer (Plantar Lesion)',
    category: 'Abnormal (DFU)',
    expectedResult: 'ABNORMAL',
    description: 'Full foot with visible circular diabetic ulcer at 1st metatarsal head, surrounding erythema and open crater.',
    generateDataUrl: generateAbnormalDFUFoot,
  },
  {
    id: 'preset-blurry-bad-light',
    name: 'Blurry / Severe Underexposure',
    category: 'Uncertain / Blurry',
    expectedResult: 'UNCERTAIN',
    description: 'Heavily defocused and dark photo that cannot be reliably assessed by the screening pipeline.',
    generateDataUrl: generateBlurryUnusableFoot,
  },
  {
    id: 'preset-non-foot',
    name: 'Non-Foot Object (Desk Item)',
    category: 'Uncertain / Blurry',
    expectedResult: 'UNCERTAIN',
    description: 'Image of a non-human object (coffee mug on desk) to verify foot detection quality gate.',
    generateDataUrl: generateNonFootObject,
  },
];
