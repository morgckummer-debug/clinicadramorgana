/**
 * Translations for exam data (title, shortDesc, hero, sections, gallery, faq)
 * Organized by exam slug and language (en, es)
 *
 * If a translation is missing, the Portuguese version is used as fallback.
 */

export const examTranslations: Record<string, Record<string, any>> = {
  "ultrassom-primeiro-trimestre-tv": {
    en: {
      title: "First Trimester Ultrasound",
      shortDesc: "Early pregnancy confirmation and accurate gestational dating.",
      hero: {
        tagline: "The beginning of everything.",
        intro: "The first trimester ultrasound is one of the most important exams during pregnancy. It provides essential information about your baby's early development and helps ensure everything is progressing well in the first months of pregnancy.",
      },
      sections: [
        {
          kind: "paragraph",
          title: "When should it be performed?",
          body: "This exam is indicated for pregnant women between 7 and 10 weeks, counted from the first day of your last menstrual period (LMP) or when beta-hCG is above 3,000 mIU/mL. It is usually the first ultrasound of pregnancy, performed after a positive pregnancy test.",
        },
        {
          kind: "list",
          title: "What is evaluated?",
          items: [
            "Whether the pregnancy is located inside the uterus (ruling out ectopic pregnancy).",
            "Presence of the gestational sac and yolk sac.",
            "Presence of the embryo with heartbeat.",
            "Number of embryos (single or twin pregnancy).",
            "More accurate gestational age, through the measurement of crown-rump length (CRL).",
          ],
        },
        {
          kind: "list",
          title: "Main complications",
          items: [
            "Ectopic pregnancy (outside the uterus).",
            "Anembryonic pregnancy (no visible embryo).",
            "Retained or threatened miscarriage.",
            "Subchorionic hematoma (possible cause of bleeding in early pregnancy).",
          ],
          footer: "Early detection of any abnormality allows for faster and more targeted care, protecting the health of both mother and baby.",
        },
        {
          kind: "paragraph",
          title: "Why not do it before 7 weeks?",
          body: "Before 7 weeks of pregnancy, it is often not yet possible to visualize the embryo or identify the heartbeat. This can cause unnecessary anxiety and the false impression that something is wrong, when in fact the pregnancy is still very early.",
        },
        {
          kind: "list",
          title: "When to do it before 7 weeks?",
          items: [
            "When the patient has bleeding or abdominal pain.",
            "When there is suspicion of ectopic pregnancy (outside the uterus).",
            "In cases of in vitro fertilization or fertility treatments.",
          ],
          footer: "In these cases, the early exam is done to ensure that the pregnancy is progressing well and that there are no risks to the mother's health. But in most cases, the exam will not show the embryo.",
        },
      ],
      gallery: [
        {
          caption: "We measure the embryo from tip to tip. This measurement is called CRL (crown-rump length). Through it we can see if the gestational age matches the date of your last menstrual period (LMP).",
          alt: "Ultrasound showing the CRL measurement of the embryo",
        },
        {
          caption: "The Yolk Sac (YS) is this round structure. It is responsible for nourishing and providing oxygen to the baby at this early stage.",
          alt: "Yolk sac seen on ultrasound",
        },
        {
          caption: "The Gestational Sac is this dark area, the amniotic fluid, where the baby will spend nine months.",
          alt: "Gestational sac seen on ultrasound",
        },
        {
          caption: "Heartbeats — the most awaited moment for mothers!",
          alt: "Ultrasound recording fetal heartbeats",
        },
      ],
    },
    es: {
      title: "Ultrasonido del Primer Trimestre",
      shortDesc: "Confirmación temprana del embarazo y datación gestacional precisa.",
      hero: {
        tagline: "El comienzo de todo.",
        intro: "El ultrasonido del primer trimestre es uno de los exámenes más importantes durante el embarazo. Proporciona información esencial sobre el desarrollo temprano de tu bebé y ayuda a garantizar que todo progresa bien en los primeros meses del embarazo.",
      },
      sections: [
        {
          kind: "paragraph",
          title: "¿Cuándo se debe realizar?",
          body: "Este examen está indicado para mujeres embarazadas entre 7 y 10 semanas, contadas desde el primer día de tu última menstruación o cuando el beta-hCG está por encima de 3.000 mUI/mL. Generalmente es el primer ultrasonido del embarazo, realizado después de una prueba de embarazo positiva.",
        },
        {
          kind: "list",
          title: "¿Qué se evalúa?",
          items: [
            "Si el embarazo está ubicado dentro del útero (descartando embarazo ectópico).",
            "Presencia del saco gestacional y la vesícula vitelina.",
            "Presencia del embrión con latidos cardíacos.",
            "Número de embriones (embarazo único o gemelar).",
            "Edad gestacional más precisa, a través de la medición de la longitud cráneo-caudal (LCC).",
          ],
        },
        {
          kind: "list",
          title: "Complicaciones principales",
          items: [
            "Embarazo ectópico (fuera del útero).",
            "Embarazo anembrionado (sin embrión visible).",
            "Aborto retenido o amenaza de aborto.",
            "Hematoma subcoriónico (posible causa de sangrado en el embarazo temprano).",
          ],
          footer: "La detección temprana de cualquier anomalía permite un cuidado más rápido y dirigido, protegiendo la salud de madre e hijo.",
        },
        {
          kind: "paragraph",
          title: "¿Por qué no hacerlo antes de 7 semanas?",
          body: "Antes de las 7 semanas de embarazo, a menudo aún no es posible visualizar el embrión o identificar los latidos cardíacos. Esto puede causar ansiedad innecesaria e impresión falsa de que algo está mal, cuando en realidad el embarazo aún está muy temprano.",
        },
        {
          kind: "list",
          title: "¿Cuándo hacerlo antes de 7 semanas?",
          items: [
            "Cuando la paciente presenta sangrado o dolor abdominal.",
            "Cuando hay sospecha de embarazo ectópico (fuera del útero).",
            "En casos de fertilización in vitro o tratamientos de fertilidad.",
          ],
          footer: "En estos casos, el examen temprano se realiza para asegurar que el embarazo está evolucionando bien y que no hay riesgos para la salud de la madre. Pero en la mayoría de los casos, el examen no mostrará el embrión.",
        },
      ],
      gallery: [
        {
          caption: "Medimos el embrión de punta a punta. Esta medida se llama LCC (longitud cráneo-caudal). A través de ella podemos ver si la edad gestacional coincide con la fecha de tu última menstruación.",
          alt: "Ultrasonido mostrando la medida de LCC del embrión",
        },
        {
          caption: "La Vesícula Vitelina (VV) es esta estructura redonda. Es responsable de nutrir y proporcionar oxígeno al bebé en esta etapa temprana.",
          alt: "Vesícula vitelina vista en el ultrasonido",
        },
        {
          caption: "El Saco Gestacional es esta área oscura, el líquido amniótico, donde el bebé pasará nueve meses.",
          alt: "Saco gestacional visto en el ultrasonido",
        },
        {
          caption: "Latidos cardíacos — ¡el momento más esperado por las mamás!",
          alt: "Ultrasonido registrando los latidos cardíacos fetales",
        },
      ],
    },
  },
};

export function getTranslatedExamField(
  slug: string,
  field: string,
  lang: "pt" | "en" | "es",
  fallback: any
): any {
  if (lang === "pt") return fallback;

  const translations = examTranslations[slug]?.[lang];
  if (!translations) return fallback;

  // Support nested fields like "hero.tagline"
  const parts = field.split(".");
  let value = translations;
  for (const part of parts) {
    value = value?.[part];
    if (value === undefined) return fallback;
  }

  return value;
}
