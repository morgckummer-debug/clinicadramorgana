// ============================================================
//  CONFIGURACIÓN DEL FLUJO DE PRE-RESERVA (ESPAÑOL)
//  Edite aquí sin necesidad de tocar nada más.
// ============================================================

// ------------------------------------------------------------
//  PANTALLA DE BIENVENIDA
// ------------------------------------------------------------
export const BOAS_VINDAS_ES = {
  // Tiempo mostrado debajo del botón "Comenzar"
  tempoEstimado: '2 a 4 minutos',
}

// ------------------------------------------------------------
//  LISTA DE EXÁMENES POR CATEGORÍA
//  Aparece en la pregunta "¿Cuál examen específicamente?"
// ------------------------------------------------------------
export const EXAMES_POR_CATEGORIA_ES: Record<string, string[]> = {
  gestacao: [
    'Obstétrico del 1º Trimestre',
    'Obstétrico - Sexo Fetal',
    '3D Completo',
    'Obstétrico con Translucencia Nuclear',
    'Obstétrico con Doppler',
    'Morfológico del 1º Trimestre',
    'Morfológico del 2º Trimestre',
    'Morfológico del 3º Trimestre',
    'Perfil Biofísico Fetal (PBF)',
    'Ecocardiograma Fetal',
  ],
  ginecologico: [
    'Transvaginal (Endovaginal)',
    'Transvaginal 3D',
    'Transvaginal con Doppler',
    'Seguimiento de Ovulación',
    'Mapeo de Endometriosis Profunda',
    'Ultrasonido Perineal',
  ],
  abdome: [
    'Abdomen Total',
    'Abdomen Superior',
    'Hipocondrio Derecho',
    'Partes Blandas y Pared Abdominal',
    'Riñones y Vías Urinarias',
    'Pelvis Masculina (Próstata)',
  ],
  mama: [
    'Mamas y Axilas',
  ],
  vascular: [
    'Duplex de Miembros Inferiores',
    'Carótidas y Vertebrales',
    'Aorta e Ilíacas',
  ],
  tireoide: [
    'Tiroides con Doppler',
    'Cervical con Doppler',
    'Glándulas Salivales',
  ],
  pediatrico: [
    'Abdomen Total (Pediátrico)',
    'Riñones y Vías Urinarias (Pediátrico)',
    'Pelvis Infantil',
    'Partes Blandas',
    'Transfontanela',
  ],
}

// ------------------------------------------------------------
//  MÉDICOS DE LA CLÍNICA
//  Aparece en la pregunta "¿Tienes preferencia por algún médico?"
// ------------------------------------------------------------
export const MEDICOS_ES = [
  { label: 'Dra. Morgana Kummer',    value: 'dra-morgana' },
  { label: 'Dra. Bárbara Rodrigues', value: 'dra-barbara' },
  { label: 'Dr. Darlei Carneiro',    value: 'dr-darlei' },
  { label: 'Dr. Paulo Gontijo Jr.',  value: 'dr-paulo' },
  { label: 'Dra. Carolina Martins',  value: 'dra-carolina' },
  { label: 'Dra. María Amélia',      value: 'dra-maria-amelia' },
  { label: 'Dr. André Mourão',       value: 'dr-andre' },
  { label: 'Sin preferencia',        value: 'sem-preferencia' },
]

// ------------------------------------------------------------
//  CONVENIOS / PLANES DE SALUD
//  Aparece en la pregunta "¿Tienes plan de salud?"
// ------------------------------------------------------------
export const CONVENIOS_ES = [
  { label: 'PARTICULAR',               value: 'particular' },
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
  { label: 'Proyecto Buen Pastor',     value: 'bom-pastor' },
  { label: 'Proyecto Evangelización',  value: 'evangelize' },
  { label: 'Santa Clara Asistencial',  value: 'santa-clara' },
  { label: 'Stellantis Saúde',         value: 'stellantis' },
]

// ------------------------------------------------------------
//  PREGUNTAS DEL FLUJO
//  Edite título, subtítulo, placeholder y opciones de cada etapa.
//  NO altere los campos "id", "type", "mask" y "next" —
//  ellos controlan la lógica interna del asistente.
// ------------------------------------------------------------
export const PERGUNTAS_ES = {

  // ETAPA 1 — Tipo de ultrasonido
  q1: {
    title: '¿Qué ultrasonido deseas reservar?',
    subtitle: 'Selecciona la opción que mejor describa lo que necesitas.',
    options: [
      { label: 'Gestación',           value: 'gestacao' },
      { label: 'Ginecológico',        value: 'ginecologico' },
      { label: 'Abdomen',             value: 'abdome' },
      { label: 'Mamas y Axilas',      value: 'mama' },
      { label: 'Vascular',            value: 'vascular' },
      { label: 'Tiroides / Cervical', value: 'tireoide' },
      { label: 'Pediátrico',          value: 'pediatrico' },
    ],
  },

  // ETAPA 2 — Examen específico (opciones completadas automáticamente por la categoría elegida)
  q2: {
    title: '¿Cuál examen específicamente?',
    subtitle: 'Si tienes orden médica, puedes verificar el nombre allí.',
  },

  // ── FLUJO EXCLUSIVO: Obstétrico del 1º Trimestre ────────────────────────────

  // OB1 – ¿Sabes la FUM?
  ob1_a: {
    title: '¿Sabes la fecha del primer día de tu última menstruación (FUM)?',
    subtitle: '',
    options: [
      { label: 'Sí', value: 'sim' },
      { label: 'No', value: 'nao' },
    ],
  },

  // OB1 – Indica la FUM
  ob1_b: {
    title: 'Indica la fecha de tu última menstruación (FUM).',
    placeholder: 'DD/MM/AAAA',
  },

  // OB1 – ¿Tienes orden médica?
  ob1_c: {
    title: '¿Tienes orden médica para este examen?',
    subtitle: '',
    options: [
      { label: 'Sí', value: 'sim' },
      { label: 'No', value: 'nao' },
    ],
  },

  // OB1 – Carga de orden médica (opcional)
  ob1_d: {
    title: 'Adjunta una foto de la orden médica.',
    subtitle: 'Foto o PDF — puede ser desde el celular.',
  },

  // OB1 – ¿Tienes resultado de beta-hCG positivo?
  ob1_e: {
    title: '¿Tienes un examen de beta-hCG positivo?',
    subtitle: '',
    options: [
      { label: 'Sí', value: 'sim' },
      { label: 'No', value: 'nao' },
    ],
  },

  // OB1 – Carga del beta-hCG (opcional)
  ob1_g: {
    title: 'Adjunta una foto del resultado del beta-hCG.',
    subtitle: 'Foto o PDF — puede ser desde el celular.',
  },

  // OB1 – ¿Tienes ultrasonido anterior de esta gestación?
  ob1_f: {
    title: '¿Tienes algún ultrasonido anterior de esta gestación?',
    subtitle: '',
    options: [
      { label: 'Sí', value: 'sim' },
      { label: 'No', value: 'nao' },
    ],
  },

  // OB1 – Carga del ultrasonido anterior (opcional)
  ob1_h: {
    title: 'Adjunta el ultrasonido anterior.',
    subtitle: 'Foto o PDF — puede ser desde el celular.',
  },

  // ── FIN DEL FLUJO EXCLUSIVO ──────────────────────────────────────────────────

  // ETAPA 2b — ¿Sabes la FUM? (solo aparece para gestación y seguimiento de ovulación)
  q2b: {
    title: '¿Sabes la fecha de tu última menstruación (FUM)?',
    subtitle: 'Esto nos ayuda a calcular las fechas ideales para tu examen.',
    options: [
      { label: 'Sí, sé la FUM',       value: 'sim' },
      { label: 'No sé / no recuerdo', value: 'nao' },
    ],
  },

  // ETAPA 2b_us — ¿Tienes ultrasonido anterior? (cuando no sabe FUM — gestación no ob1)
  q2b_us: {
    title: '¿Tienes un ultrasonido anterior de esta gestación?',
    subtitle: 'Hablamos del primer examen donde apareció el embrión con latidos cardíacos.',
    options: [
      { label: 'Sí, tengo', value: 'sim' },
      { label: 'No tengo', value: 'nao' },
    ],
  },

  // ETAPA 2b_us_data — Fecha del ultrasonido anterior
  q2b_us_data: {
    title: '¿Cuál es la fecha de ese ultrasonido?',
    subtitle: 'Indica la fecha del primer ultrasonido donde apareció el embrión con latidos cardíacos.',
    placeholder: 'DD/MM/AAAA',
  },

  // ETAPA 2b_us_sem — Semanas mostradas en el ultrasonido anterior
  q2b_us_sem: {
    title: '¿Cuántas semanas mostró ese ultrasonido?',
    subtitle: 'Si el informe informó semanas y días, escribe así: 12+3',
    placeholder: 'Ej: 12 o 12+3',
  },

  // ETAPA 2c — ¿Cuál es la FUM? (solo aparece si respondió "sí" en 2b)
  q2c: {
    title: '¿Cuál fue la fecha de tu última menstruación?',
    placeholder: 'DD/MM/AAAA',
  },

  // ETAPA 2d — ¿Tienes orden médica? (cuando NO sabe la FUM, para gestación)
  q2d: {
    title: '¿Tienes la orden médica a mano?',
    subtitle: 'Puede ser foto o PDF.',
    options: [
      { label: 'Sí, tengo la orden',  value: 'sim' },
      { label: 'No tengo la orden',   value: 'nao' },
    ],
  },

  // ETAPA 2e — ¿Tienes orden médica? (cuando sabe la FUM, para gestación)
  q2e: {
    title: '¿Tienes la orden médica?',
    subtitle: 'Puede ser foto o PDF.',
    options: [
      { label: 'Sí, tengo.',  value: 'sim' },
      { label: 'No tengo.',   value: 'nao' },
    ],
  },

  // ETAPA 2f — Carga de orden médica
  q2f: {
    title: '¡Excelente! Adjunta la orden médica aquí.',
    subtitle: 'Foto o PDF — puede ser desde el celular.',
  },

  // ETAPA 2g — Carga del beta-HCG
  q2g: {
    title: '¡Excelente! Adjunta el resultado del beta-HCG aquí.',
    subtitle: 'Foto o PDF — puede ser desde el celular.',
  },

  // ETAPA 2h — ¿Tienes resultado de beta-HCG? (aparece cuando no tiene orden médica para gestación)
  q2h: {
    title: '¿Tienes el resultado del examen de beta-HCG?',
    subtitle: 'Necesitamos la orden médica o el beta-HCG para agendar correctamente.',
    options: [
      { label: 'Sí, tengo.',  value: 'sim' },
      { label: 'No tengo.',   value: 'nao' },
    ],
  },

  // ETAPA 3 — Nombre completo
  q3: {
    title: '¿Cuál es tu nombre completo?',
    placeholder: 'Nombre completo',
  },

  // ETAPA 4 — CPF
  q4: {
    title: '¿Cuál es tu CPF?',
    subtitle: 'Se utiliza para identificar tu registro y evitar duplicidades.',
    placeholder: '000.000.000-00',
  },

  // ETAPA 5 — Fecha de nacimiento
  q5: {
    title: '¿Cuál es tu fecha de nacimiento?',
    placeholder: 'DD/MM/AAAA',
  },

  // ETAPA 6 — Teléfono
  q6: {
    title: '¿Cuál es el mejor número para contacto?',
    subtitle: 'Nuestro equipo se pondrá en contacto por WhatsApp en este número.',
    placeholder: '(31) 99999-9999',
  },

  // ETAPA 7 — Plan de salud (opciones definidas en CONVENIOS_ES arriba)
  q7: {
    title: '¿Tienes plan de salud o socio con nosotros?',
    subtitle: 'Selecciona tu plan de salud.',
  },

  // ETAPA 8 — Turno preferido
  q8: {
    title: '¿Cuál turno prefieres?',
    options: [
      { label: 'Mañana',        value: 'manha' },
      { label: 'Tarde',         value: 'tarde' },
      { label: 'Sin preferencia', value: 'indiferente' },
    ],
  },

  // ETAPA 9 — Médico preferido (opciones definidas en MEDICOS_ES arriba)
  q9: {
    title: '¿Tienes preferencia por algún médico?',
  },

  // ETAPA 10 — Carga de la orden médica (obligatoria)
  q10: {
    title: 'Adjunta la orden médica.',
    subtitle: 'Foto o PDF — puede ser desde el celular.',
  },

  // ETAPA 11 — Observaciones libres (opcional)
  q11: {
    title: '¿Alguna observación para nuestro equipo?',
    subtitle: 'Opcional. Dificultad de locomoción, urgencia, dudas — cualquier información que ayude.',
    placeholder: 'Ej: tengo dificultad de locomoción, prefiero horario matutino…',
  },

  // ETAPA 12 — Consentimiento LGPD (obligatorio, distinto del término de responsabilidad de la clínica)
  consentimento_lgpd: {
    title: 'Autorización para el tratamiento de datos personales',
    subtitle:
      'Este consentimiento se refiere específicamente al uso de tus datos personales y de salud en esta pre-reserva. Es distinto del término de responsabilidad que podrás firmar presencialmente en la clínica.',
    consentLabel:
      'He leído y autorizo el tratamiento de mis datos personales y de salud (nombre, CPF, teléfono, fecha de nacimiento, orden médica y demás información brindada en esta etapa) por la Clínica Dra. Morgana, exclusivamente para agendar, realizar y dar seguimiento a mi examen, conforme la Política de Privacidad.',
  },
}
