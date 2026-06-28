// ============================================================
//  FLOW CONFIGURATION FOR PRE-BOOKING (ENGLISH)
//  Edit here without touching anything else.
// ============================================================

// ------------------------------------------------------------
//  WELCOME SCREEN
// ------------------------------------------------------------
export const BOAS_VINDAS_EN = {
  tempoEstimado: '2 to 4 minutes',
}

// ------------------------------------------------------------
//  EXAM LIST BY CATEGORY
//  Appears in the question "Which exam specifically?"
// ------------------------------------------------------------
export const EXAMES_POR_CATEGORIA_EN: Record<string, string[]> = {
  gestacao: [
    'Obstetric 1st Trimester',
    'Obstetric - Fetal Sex',
    '3D Complete',
    'Obstetric with Nuchal Translucency',
    'Obstetric with Doppler',
    '1st Trimester Anomaly Scan',
    '2nd Trimester Anomaly Scan',
    '3rd Trimester Anomaly Scan',
    'Fetal Biophysical Profile (FBP)',
    'Fetal Echocardiogram',
  ],
  ginecologico: [
    'Transvaginal (Endovaginal)',
    'Transvaginal 3D',
    'Transvaginal with Doppler',
    'Ovulation Tracking',
    'Deep Endometriosis Mapping',
    'Perineal Ultrasound',
  ],
  abdome: [
    'Complete Abdomen',
    'Upper Abdomen',
    'Right Hypochondrium',
    'Soft Tissues and Abdominal Wall',
    'Kidneys and Urinary Tract',
    'Male Pelvis (Prostate)',
  ],
  mama: [
    'Breasts and Axillae',
  ],
  vascular: [
    'Lower Limb Duplex Scan',
    'Carotids and Vertebrals',
    'Aorta and Iliacs',
  ],
  tireoide: [
    'Thyroid with Doppler',
    'Cervical with Doppler',
    'Salivary Glands',
  ],
  pediatrico: [
    'Complete Abdominal (Pediatric)',
    'Kidneys and Urinary Tract (Pediatric)',
    'Pediatric Pelvis',
    'Soft Tissues',
    'Transfontanelle',
  ],
}

// ------------------------------------------------------------
//  CLINIC PHYSICIANS
//  Appears in the question "Do you have a preference for any physician?"
// ------------------------------------------------------------
export const MEDICOS_EN = [
  { label: 'Dr. Morgana Kummer',    value: 'dra-morgana' },
  { label: 'Dr. Bárbara Rodrigues', value: 'dra-barbara' },
  { label: 'Dr. Darlei Carneiro',   value: 'dr-darlei' },
  { label: 'Dr. Paulo Gontijo Jr.', value: 'dr-paulo' },
  { label: 'Dr. Carolina Martins',  value: 'dra-carolina' },
  { label: 'Dr. Maria Amélia',      value: 'dra-maria-amelia' },
  { label: 'Dr. André Mourão',      value: 'dr-andre' },
  { label: 'No preference',         value: 'sem-preferencia' },
]

// ------------------------------------------------------------
//  HEALTH PLANS
//  Appears in the question "Do you have a health plan?"
// ------------------------------------------------------------
export const CONVENIOS_EN = [
  { label: 'PRIVATE PAY',              value: 'particular' },
  { label: 'AGEBRAS',                  value: 'agebras' },
  { label: 'Aurora Saúde',             value: 'aurora' },
  { label: 'Casembrapa',               value: 'casembrapa' },
  { label: 'Cemig Saúde',              value: 'cemig' },
  { label: 'COPASS Saúde',             value: 'copass' },
  { label: 'Fundaffemg',               value: 'fundaffemg' },
  { label: 'FUSEX',                    value: 'fusex' },
  { label: 'Grupo ZELO',               value: 'zelo' },
  { label: 'Hapvida',                  value: 'hapvida' },
  { label: 'MedGold Saúde',            value: 'medgold' },
  { label: 'NotreDame Intermédica',    value: 'notredame' },
  { label: 'Pax de Minas',             value: 'pax-minas' },
  { label: 'Projeto Bom Pastor',       value: 'bom-pastor' },
  { label: 'Projeto Evangelize',       value: 'evangelize' },
  { label: 'Santa Clara Assistencial', value: 'santa-clara' },
  { label: 'Stellantis Saúde',         value: 'stellantis' },
]

// ------------------------------------------------------------
//  FLOW QUESTIONS
//  Edit title, subtitle, placeholder and options for each step.
//  Do NOT change the "id", "type", "mask" and "next" fields —
//  they control the assistant's internal logic.
// ------------------------------------------------------------
export const PERGUNTAS_EN = {

  // STEP 1 — Type of ultrasound
  q1: {
    title: 'Which ultrasound would you like to book?',
    subtitle: 'Select the option that best describes what you need.',
    options: [
      { label: 'Pregnancy',          value: 'gestacao' },
      { label: 'Gynaecological',     value: 'ginecologico' },
      { label: 'Abdomen',            value: 'abdome' },
      { label: 'Breasts and Axillae', value: 'mama' },
      { label: 'Vascular',           value: 'vascular' },
      { label: 'Thyroid / Cervical', value: 'tireoide' },
      { label: 'Paediatric',         value: 'pediatrico' },
    ],
  },

  // STEP 2 — Specific exam (options filled automatically by chosen category)
  q2: {
    title: 'Which exam specifically?',
    subtitle: 'If you have a referral, you can check the name there.',
  },

  // ── EXCLUSIVE FLOW: Obstetric 1st Trimester ────────────────────────────

  // OB1 – Do you know the LMP?
  ob1_a: {
    title: 'Do you know the date of the first day of your last menstrual period (LMP)?',
    subtitle: '',
    options: [
      { label: 'Yes', value: 'sim' },
      { label: 'No',  value: 'nao' },
    ],
  },

  // OB1 – Enter the LMP
  ob1_b: {
    title: 'Enter the date of your last menstrual period (LMP).',
    placeholder: 'DD/MM/YYYY',
  },

  // OB1 – Do you have a medical referral?
  ob1_c: {
    title: 'Do you have a medical referral for this exam?',
    subtitle: '',
    options: [
      { label: 'Yes', value: 'sim' },
      { label: 'No',  value: 'nao' },
    ],
  },

  // OB1 – Upload referral (optional)
  ob1_d: {
    title: 'Attach a photo of the medical referral.',
    subtitle: 'Photo or PDF — your phone camera is fine.',
  },

  // OB1 – Do you have a positive beta-hCG result?
  ob1_e: {
    title: 'Do you have a positive beta-hCG result?',
    subtitle: '',
    options: [
      { label: 'Yes', value: 'sim' },
      { label: 'No',  value: 'nao' },
    ],
  },

  // OB1 – Upload beta-hCG (optional)
  ob1_g: {
    title: 'Attach a photo of the beta-hCG result.',
    subtitle: 'Photo or PDF — your phone camera is fine.',
  },

  // OB1 – Do you have a previous ultrasound from this pregnancy?
  ob1_f: {
    title: 'Do you have a previous ultrasound from this pregnancy?',
    subtitle: '',
    options: [
      { label: 'Yes', value: 'sim' },
      { label: 'No',  value: 'nao' },
    ],
  },

  // OB1 – Upload previous ultrasound (optional)
  ob1_h: {
    title: 'Attach the previous ultrasound.',
    subtitle: 'Photo or PDF — your phone camera is fine.',
  },

  // ── END OF EXCLUSIVE FLOW ──────────────────────────────────────────────────

  // STEP 2b — Do you know the LMP? (only appears for pregnancy and ovulation tracking)
  q2b: {
    title: 'Do you know the date of your last menstrual period (LMP)?',
    subtitle: 'This helps us calculate the ideal dates for your exam.',
    options: [
      { label: 'Yes, I know my LMP',      value: 'sim' },
      { label: "I don't know / don't remember", value: 'nao' },
    ],
  },

  // STEP 2b_us — Do you have a previous ultrasound? (when LMP unknown — pregnancy not ob1)
  q2b_us: {
    title: 'Do you have a previous ultrasound from this pregnancy?',
    subtitle: 'We mean the first exam where the embryo appeared with a heartbeat.',
    options: [
      { label: 'Yes, I have one', value: 'sim' },
      { label: "No, I don't",     value: 'nao' },
    ],
  },

  // STEP 2b_us_data — Date of previous ultrasound
  q2b_us_data: {
    title: "What is the date of that ultrasound?",
    subtitle: 'Enter the date of the first ultrasound where the embryo appeared with a heartbeat.',
    placeholder: 'DD/MM/YYYY',
  },

  // STEP 2b_us_sem — Weeks shown in previous ultrasound
  q2b_us_sem: {
    title: 'How many weeks did that ultrasound show?',
    subtitle: 'If the report stated weeks and days, write it like this: 12+3',
    placeholder: 'e.g. 12 or 12+3',
  },

  // STEP 2c — What is the LMP? (only appears if answered "yes" in 2b)
  q2c: {
    title: 'What was the date of your last menstrual period?',
    placeholder: 'DD/MM/YYYY',
  },

  // STEP 2d — Do you have a referral? (when LMP unknown, for pregnancy)
  q2d: {
    title: 'Do you have the medical referral with you?',
    subtitle: 'Photo or PDF accepted.',
    options: [
      { label: 'Yes, I have the referral', value: 'sim' },
      { label: "No, I don't",              value: 'nao' },
    ],
  },

  // STEP 2e — Do you have a referral? (when LMP known, for pregnancy)
  q2e: {
    title: 'Do you have the medical referral?',
    subtitle: 'Photo or PDF accepted.',
    options: [
      { label: 'Yes, I have it.', value: 'sim' },
      { label: "No, I don't.",    value: 'nao' },
    ],
  },

  // STEP 2f — Upload medical referral
  q2f: {
    title: 'Great! Attach the medical referral here.',
    subtitle: 'Photo or PDF — your phone camera is fine.',
  },

  // STEP 2g — Upload beta-HCG
  q2g: {
    title: 'Great! Attach the beta-HCG result here.',
    subtitle: 'Photo or PDF — your phone camera is fine.',
  },

  // STEP 2h — Do you have a beta-HCG result? (appears when no referral for pregnancy)
  q2h: {
    title: 'Do you have the beta-HCG test result?',
    subtitle: 'We need either the medical referral or the beta-HCG to book correctly.',
    options: [
      { label: 'Yes, I have it.', value: 'sim' },
      { label: "No, I don't.",    value: 'nao' },
    ],
  },

  // STEP 3 — Full name
  q3: {
    title: 'What is your full name?',
    placeholder: 'Full name',
  },

  // STEP 4 — CPF
  q4: {
    title: 'What is your CPF?',
    subtitle: 'Used to identify your record and avoid duplicates.',
    placeholder: '000.000.000-00',
  },

  // STEP 5 — Date of birth
  q5: {
    title: 'What is your date of birth?',
    placeholder: 'DD/MM/YYYY',
  },

  // STEP 6 — Phone
  q6: {
    title: 'What is the best number to reach you?',
    subtitle: 'Our team will contact you via WhatsApp at this number.',
    placeholder: '(31) 99999-9999',
  },

  // STEP 7 — Health plan (options defined in CONVENIOS_EN above)
  q7: {
    title: 'Do you have a health plan or partnership with us?',
    subtitle: 'Select your health plan.',
  },

  // STEP 8 — Preferred shift
  q8: {
    title: 'Which shift do you prefer?',
    options: [
      { label: 'Morning',         value: 'manha' },
      { label: 'Afternoon',       value: 'tarde' },
      { label: 'No preference',   value: 'indiferente' },
    ],
  },

  // STEP 9 — Preferred physician (options defined in MEDICOS_EN above)
  q9: {
    title: 'Do you have a preference for any physician?',
  },

  // STEP 10 — Upload medical referral (mandatory)
  q10: {
    title: 'Attach the medical referral.',
    subtitle: 'Photo or PDF — your phone camera is fine.',
  },

  // STEP 11 — Free observations (optional)
  q11: {
    title: 'Any notes for our team?',
    subtitle: 'Optional. Mobility issues, urgency, questions — any information that helps.',
    placeholder: 'e.g. I have mobility issues, I prefer morning appointments…',
  },
}
