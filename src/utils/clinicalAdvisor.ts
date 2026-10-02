/**
 * Evidence-based clinical response engine for Kurai AI.
 * Grounded in IWGDF (International Working Group on the Diabetic Foot) 2023
 * and ADA (American Diabetes Association) Standards of Care.
 * Fluent English and Tamil (தமிழ்) clinical guidance.
 */

interface ContextInfo {
  result?: string;
  observations?: string[];
}

export function generateKuraiClinicalResponse(
  question: string,
  context?: ContextInfo | null
): string {
  const isTamil = /[\u0B80-\u0BFF]/.test(question);
  const q = question.toLowerCase();

  if (isTamil) {
    let prefixTa = '';
    if (context?.result === 'abnormal' || context?.result === 'ABNORMAL') {
      prefixTa = `⚠️ **முக்கிய மருத்துவ எச்சரிக்கை**: உங்கள் சமீபத்திய ஆரம்பநிலை பரிசோதனையில் பாதத்தில் புண் போன்ற தோற்றம் கண்டறியப்பட்டுள்ளது. பாதத்தில் அதிக அழுத்தம் கொடுக்காமல் உடனடியாக மருத்துவரை அணுகவும்.\n\n`;
    }

    // 1. Numbness / உணர்ச்சி குறைவு
    if (q.includes('உணர்ச்சி') || q.includes('மறுத்து') || q.includes('மரத்து') || q.includes('எரிச்சல்') || q.includes('குடைச்சல்')) {
      return prefixTa + `### பாதங்களில் உணர்ச்சி குறைதல் மற்றும் நீரிழிவு நரம்புப் பாதிப்பு

பாதங்களில் மதமதப்பு, உணர்வின்மை அல்லது எரியும் உணர்வு ஆகியவை **நீரிழிவு நரம்புப் பாதிப்பின் (Diabetic Neuropathy)** முக்கிய அறிகுறிகளாகும்.

**கட்டாயம் பின்பற்ற வேண்டிய பாதுகாப்பு முறைகள்:**
1. **வலியை மட்டுமே நம்பியிருக்க வேண்டாம்**: நரம்புகள் பாதிக்கப்படுவதால் காலில் முள், கண்ணாடி அல்லது கொப்புளங்கள் ஏற்பட்டாலும் வலி தெரியாது.
2. **தினமும் கண்ணாடியில் பாருங்கள்**: நல்ல வெளிச்சத்தில் உள்ளங்கால் மற்றும் விரல் இடுக்குகளைக் கண்ணாடியால் பார்த்து பரிசோதிக்கவும்.
3. **வெறும் கால்களுடன் நடக்கக் கூடாது**: வீட்டிற்குள்ளும் எப்போதும் மென்மையான காலணிகளை அணியவும்.
4. **வெந்நீர் சூடு பாதுகாப்பு**: குளிக்கும் நீரின் சூட்டை முழங்கையால் தொட்டுப் பார்த்தே பயன்படுத்த வேண்டும் (37°C-க்கு குறைவாக).
5. **மருத்துவப் பரிசோதனை**: ஆண்டுக்கு ஒருமுறை நரம்பு உணர்ச்சிப் பரிசோதனை (Monofilament test) செய்து கொள்ளவும்.

*குரல் AI குறிப்பு: இது விழிப்புணர்வு தகவல் மட்டுமே. மருத்துவ சிகிச்சைக்காக மருத்துவரை அணுகவும்.*`;
    }

    // 2. Inspection / பரிசோதனை
    if (q.includes('பரிசோதி') || q.includes('பார்ப்பது') || q.includes('கண்ணாடி') || q.includes('எவ்வாறு')) {
      return prefixTa + `### தினமும் பாதங்களைப் பரிசோதிக்கும் எளிய முறை

பாதப் புண்களை ஆரம்பத்திலேயே தடுக்க தினமும் பாதங்களைப் பரிசோதிப்பதே சிறந்த வழியாகும்.

**பரிசோதிக்கும் வழிமுறைகள்:**
1. **நல்ல வெளிச்சத்தில் அமரவும்**: தினமும் ஒரே நேரத்தில் (இரவு தூங்குவதற்கு முன் அல்லது குளித்த பின்) பாதங்களைப் பார்க்கவும்.
2. **விரல்கள் & முன்கால்**: விரல் இடுக்குகளில் தோல் உரிதல், வெடிப்பு அல்லது வெள்ளை நிற ஈரப்பதம் உள்ளதா எனப் பார்க்கவும்.
3. **கண்ணாடி கொண்டு உள்ளங்கால்**: தரையில் உடையாத கண்ணாடியை வைத்து குதிகால் மற்றும் உள்ளங்காலை முழுமையாகப் பார்க்கவும்.
4. **சூடு வேறுபாடு**: பாதத்தின் குறிப்பிட்ட பகுதி மட்டும் அதிக சூடாக உள்ளதா என்று கையால் தொட்டு உணரவும்.
5. **மருத்துவ உதவி**: 24-48 மணி நேரத்திற்குள் ஆறாத எந்த ஒரு சிறு காயத்திற்கும் மருத்துவரை அணுகவும்.`;
    }

    // 3. Shoes / footwear / காலணிகள் / சாக்ஸ்
    if (q.includes('காலணி') || q.includes('செருப்பு') || q.includes('சாக்ஸ்') || q.includes('நடக்க')) {
      return prefixTa + `### நீரிழிவு நோயாளிகளுக்கான சரியான காலணிகள் & சாக்ஸ்

80%க்கும் அதிகமான பாதப் புண்கள் தவறான, இறுக்கமான காலணிகளால் ஏற்படும் உராய்வினாலேயே உருவாகின்றன!

**காலணிகள் தேர்ந்தெடுக்கும் விதம்:**
- **அகலமான முனைக் கொண்ட காலணிகள்**: விரல்களை நசுக்காத அகலமான முன் பகுதி இருக்க வேண்டும்.
- **தைப்புகள் இல்லாத மென்மையான உட்பகுதி**: காலில் உராய்வு ஏற்படாமல் தடுக்கும் மெத்தென்ற வடிவமைப்பு.
- **அளவை சரிசெய்து கட்டும் பட்டைகள் (Velcro/Laces)**: மாலை நேர வீக்கத்திற்கு ஏற்ப மாற்றிக்கொள்ள உதவும்.
- **வெறும் கால்களுடன் நடக்கவே கூடாது**: கோயில்கள், மணல் அல்லது வீட்டிற்குள்ளும் எப்போதும் காலணி அணியவும்.
- **தையல் இல்லாத சாக்ஸ்**: வெளிர் நிற பருத்தி சாக்ஸ்களை அணியவும்; ரத்தம் அல்லது சீழ் கசிந்தால் உடனடியாகத் தெரியும்.`;
    }

    // 4. Food / diet / உணவு முறை
    if (q.includes('உணவு') || q.includes('சாப்பிட') || q.includes('காய்கறி') || q.includes('சாப்பாடு')) {
      return prefixTa + `### பாத ஆரோக்கியம் மற்றும் புண்களை ஆற்றும் இந்திய உணவு முறை

ரத்தத்தில் சர்க்கரை அளவைக் கட்டுப்படுத்துவதும் போதுமான புரதம் உண்பதும் பாதப் புண்களை மிக வேகமாக ஆற்றும்.

**அடிக்கடி சேர்க்க வேண்டியவை:**
- **கீரைகள் & நாட்டுக்காய்கறிகள்**: முருங்கைக்கீரை, வெண்டைக்காய், சுரைக்காய், பாகற்காய் (அதிக நார்ச்சத்து).
- **புரதச்சத்து**: பாசிப்பயறு சுண்டல், கொண்டைக்கடலை, முட்டை, மீன் (தோல் திசுக்களை உருவாக்க உதவும்).
- **சிறு தானியங்கள்**: குதிரைவாலி, தினை, கேழ்வரகு (குறைந்த கிளைசெமிக் குறியீடு).

**தவிர்க்க வேண்டியவை:**
- வெள்ளை சர்க்கரை, இனிப்புகள், மைதா, குளிர்பானங்கள் மற்றும் எண்ணெயில் பொரித்த உணவுகள்.

*முக்கிய குறிப்பு: உங்கள் உடல்நிலைக்கு ஏற்ப தனிப்பயனாக்கப்பட்ட உணவு ஆலோசனைக்கு ஊட்டச்சத்து நிபுணரை அணுகவும்.*`;
    }

    // Default Tamil guidance
    return prefixTa + `### நீரிழிவு பாத நலன் – அடிப்படை வழிகாட்டுதல்கள்

பாதங்களை ஆரோக்கியமாகப் பாதுகாக்க இந்த 5 எளிய விதிகளைப் பின்பற்றுங்கள்:

1. **தினசரி பரிசோதனை**: உள்ளங்கால் மற்றும் விரல் இடுக்குகளைக் கண்ணாடி மூலம் தினமும் பார்க்கவும்.
2. **பாதங்களை உலர்வாக வைக்கவும்**: குளித்த பின் விரல் இடுக்குகளைத் துடைத்து ஈரம் இல்லாமல் வைக்கவும்.
3. **வெறும் கால்களுடன் நடக்கக் கூடாது**: எப்போதும் பாதுகாப்பான காலணிகளை அணியவும்.
4. **சுய மருத்துவம் செய்யக் கூடாது**: கால் ஆணிகளை பிளேடு அல்லது ஆசிட் பிளாஸ்டர் மூலம் நீக்க வேண்டாம்.
5. **ஆரம்ப மருத்துவ ஆலோசனை**: ஏதேனும் சிவப்பு வளையம், வீக்கம் அல்லது காயம் கண்டால் உடனே மருத்துவரை அணுகவும்.

*பாத பராமரிப்பு, காலணிகள் அல்லது உணவு முறை குறித்து மேலும் கேட்கலாம்!*`;
  }

  // ENGLISH GUIDANCE
  let prefix = '';
  if (context?.result === 'abnormal' || context?.result === 'ABNORMAL') {
    prefix = `⚠️ **Clinical Precaution**: Based on your recent preliminary screening indicating an abnormal wound/ulcer-like visual pattern, please avoid putting direct weight on that foot and consult a podiatrist promptly.\n\n`;
  }

  // 1. Numbness, tingling, neuropathy, loss of sensation
  if (q.includes('numb') || q.includes('tingl') || q.includes('neuropath') || q.includes('feel') || q.includes('pins')) {
    return prefix + `### Understanding Foot Numbness & Diabetic Neuropathy

Numbness, tingling ("pins and needles"), or burning sensations are classic signs of **diabetic peripheral neuropathy** (nerve damage caused by prolonged elevated blood glucose).

**Crucial Steps to Protect Numb Feet:**
1. **Never Rely on Pain as a Warning**: Because nerve endings are blunted, you may not feel cuts, blisters, burns, or foreign objects (like a pebble inside your shoe).
2. **Conduct Daily Visual Inspections**: Use good lighting and a mirror to inspect the soles, heels, and between every toe.
3. **Never Walk Barefoot**: Always wear supportive, hard-soled footwear—even inside your home.
4. **Water Temperature Safety**: Always test bath water with an elbow or thermometer (keep below 37°C / 98.6°F) to prevent painless scald burns.
5. **Clinical Evaluation**: Request a comprehensive monofilament and vibration sensory exam from your podiatrist or primary care physician.

*Kurai AI Disclaimer: This information is for educational purposes and does not replace in-person medical evaluation.*`;
  }

  // 2. Inspection, checking feet, mirror
  if (q.includes('inspect') || q.includes('check') || q.includes('mirror') || q.includes('routine') || q.includes('look')) {
    return prefix + `### Step-by-Step Daily Foot Inspection Routine

Daily inspection is the single most effective habit to catch skin breakdown before it becomes a dangerous ulcer.

**How to Inspect Your Feet:**
1. **Choose Good Lighting**: Sit in a well-lit room at the same time each day (e.g., right before bed or after showering).
2. **Check the Tops & Toes**: Look for redness, swelling, blisters, corns, or nail changes.
3. **Inspect the Soles with a Mirror**: Place an unbreakable hand mirror on the floor or hold it to examine your heels, balls of your feet, and arches.
4. **Examine Between All Toes**: Gently spread each toe to look for white peeling skin, moisture (maceration), cracks, or fungal signs.
5. **Feel for Temperature Differences**: Use the back of your hand to feel if one foot or area is noticeably hotter (which signals hidden inflammation or infection).

*If you notice any cut, scratch, or discoloration that does not improve after 24–48 hours, contact your podiatrist immediately.*`;
  }

  // 3. Shoes, footwear, socks
  if (q.includes('shoe') || q.includes('sock') || q.includes('footwear') || q.includes('sneaker') || q.includes('sandal') || q.includes('heel') || q.includes('barefoot')) {
    return prefix + `### Diabetic Footwear & Sock Recommendations

Over 80% of diabetic foot ulcers originate from shoe friction against insensate pressure points.

**What to Look For in Shoes:**
- **Broad, Deep Toe Box**: Allows toes to wiggle without pinching or friction.
- **Cushioned, Seamless Lining**: Prevents internal ridges from rubbing against delicate skin.
- **Adjustable Fastenings (Laces or Velcro)**: Accommodates normal daytime foot swelling.
- **Shock-Absorbing Solid Outsoles**: Shields your soles against punctures from nails or glass.

**Essential Rules for Socks & Wearing Shoes:**
- **Inspect Inside Shoes Every Day**: Shake out and run your hand inside shoes before putting them on to detect pebbles, stray tacks, or folded insoles.
- **Wear Seamless Diabetic Socks**: Choose light-colored cotton or moisture-wicking bamboo socks so any bleeding or drainage is immediately visible.
- **Avoid**: Pointed-toe shoes, high heels (> 2 cm), rigid flip-flops, and walking barefoot anywhere.`;
  }

  // 4. Food, diet, nutrition
  if (q.includes('food') || q.includes('diet') || q.includes('eat') || q.includes('nutri') || q.includes('meal')) {
    return prefix + `### Nutrition Guidelines for Foot Health & Ulcer Prevention

Stable blood glucose and adequate structural building blocks are vital for microvascular tissue perfusion and dermal wound healing.

**Include Regularly:**
- **Country Greens & Non-Starchy Vegetables**: Murungai keerai, palak, bottle gourd, okra, and bitter gourd.
- **Lean Proteins**: Moong dal, black chana sundal, boiled country eggs, and small fish rich in Omega-3.
- **Whole Millets**: Kuthiraivali, thinai, samai, and ragi for low-glycemic, sustained energy.

**Minimize / Avoid:**
- Refined white sugar, traditional sweets (gulab jamun, halwa), maida preparations (parotta), carbonated sodas, and deep-fried bajjis/vadas.

*Always consult your personal physician or registered dietitian for individualized meal planning.*`;
  }

  // 5. Blister, wound, ulcer, cut, sore
  if (q.includes('blister') || q.includes('wound') || q.includes('ulcer') || q.includes('cut') || q.includes('sore') || q.includes('bleed')) {
    return prefix + `### Urgent Care Protocol: Blisters, Wounds, & Cuts

Any break in the skin on a diabetic foot requires immediate attention to prevent deep subcutaneous infection.

**Immediate First-Aid Protocol:**
1. **Clean Gently**: Wash the area gently with sterile saline or mild soap and lukewarm water. Do NOT use harsh alcohol or hydrogen peroxide.
2. **Do NOT Pop Blisters**: The intact blister roof serves as a sterile natural barrier against bacteria.
3. **Apply a Sterile Dry Dressing**: Cover with non-stick gauze. Avoid harsh adhesive tapes directly touching fragile skin.
4. **Offload Pressure**: Do not walk on the affected area. Avoid wearing the shoe that caused the blister.
5. **Contact Healthcare Provider**: If you see spreading redness, yellowish drainage, or if the wound fails to heal within 48 hours, seek clinical wound care immediately.

*🚨 Seek emergency care immediately if accompanied by fever, chills, black tissue, or foul odor.*`;
  }

  // Default English guidance
  return prefix + `### Diabetic Foot Health Guidance

Maintaining healthy feet with diabetes requires a proactive daily routine:

1. **Daily Visual Inspection**: Check tops, soles, and between toes every day with a mirror.
2. **Protect Against Injury**: Never walk barefoot, even indoors. Always wear supportive shoes and seamless socks.
3. **Proper Skin Hygiene**: Wash in lukewarm water, dry thoroughly (especially between toes), and moisturize heels and soles only.
4. **Professional Care**: Never cut calluses or corns yourself; have them safely debrided by a licensed podiatrist.
5. **Immediate Reporting**: Contact your healthcare team promptly at the first sign of redness, heat, swelling, or skin breakdown.

*Feel free to ask me about specific topics such as footwear selection, managing calluses, or safe daily inspection techniques!*`;
}
