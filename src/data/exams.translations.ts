/**
 * Translations for exam data (title, shortDesc, hero, sections, gallery, faq)
 * Organized by exam slug and language (en, es)
 *
 * If a translation is missing, the Portuguese version is used as fallback.
 */

export const examTranslations: Record<string, Record<string, any>> = {
  "obstetrico-translucencia-nucal": {
    en: {
      title: "Obstetric with Nuchal Translucency",
      shortDesc: "Screening for chromosomal abnormalities between 12 and 13 weeks 6 days.",
      hero: {
        tagline: "A careful look in the first weeks.",
        intro: "Nuchal Translucency (NT) is a small layer of fluid that accumulates in the baby's neck region. This measurement is important because it helps identify possible chromosomal changes, such as Down syndrome, Edwards syndrome, and Patau syndrome."
      },
      sections: [
        {
          kind: "list",
          title: "Why is it so important?",
          items: ["Helps calculate the risk of conditions such as Down Syndrome through measurement of the neck (NT), heart rate, and maternal age.", "Allows adjustment of gestational age if there are still doubts.", "Checks the baby's initial formation, such as arms and legs."]
        },
        {
          kind: "paragraph",
          title: "When should it be performed?",
          body: "The ultrasound with NT should be performed between 12 and 13 weeks 6 days of gestation, or when the baby measures between 4.5 and 8.5 cm from head to buttocks (called CCN)."
        },
        {
          kind: "paragraph",
          title: "What if the NT is abnormal?",
          body: "If there are signs that lead the doctor to suspect the baby has an increased risk of having a syndrome, it may be recommended to proceed with tests that confirm or rule out the suspicion, such as amniocentesis, karyotype, or NIPT, if desired by the parents."
        }
      ],
      faq: [
        { q: "Do I need preparation for the exam?", a: "No fasting or full bladder is required." },
        { q: "Is it safe for the baby?", a: "Yes! Ultrasound does not use X-rays." },
        { q: "Do I need a medical request to perform the exam?", a: "Yes, the ultrasound with Nuchal Translucency is usually requested by the obstetrician." },
        { q: "How long does the ultrasound with NT take?", a: "There is no set time, as the doctor depends entirely on the baby's position and the need for additional evaluations." }
      ]
    },
    es: {
      title: "Obstétrico con Translucencia Nucal",
      shortDesc: "Detección de anomalías cromosómicas entre 12 y 13 semanas 6 días.",
      hero: {
        tagline: "Una mirada atenta en las primeras semanas.",
        intro: "La Translucencia Nucal (TN) es una pequeña capa de líquido que se acumula en la región del cuello del bebé. Esta medida es importante porque ayuda a identificar posibles cambios cromosómicos, como síndrome de Down, síndrome de Edwards y síndrome de Patau."
      },
      sections: [
        {
          kind: "list",
          title: "¿Por qué es tan importante?",
          items: ["Ayuda a calcular el riesgo de condiciones como síndrome de Down, a través de la medida de la nuca (TN), frecuencia cardíaca y edad materna.", "Permite ajustar la edad gestacional si aún hay dudas.", "Verifica la formación inicial del bebé, como brazos y piernas."]
        },
        {
          kind: "paragraph",
          title: "¿Cuándo debe realizarse?",
          body: "El ultrasónico con TN debe realizarse entre 12 y 13 semanas 6 días de gestación, o cuando el bebé mide entre 4,5 y 8,5 cm de la cabeza a las nalgas (denominado CCN)."
        },
        {
          kind: "paragraph",
          title: "¿Qué sucede si la TN está alterada?",
          body: "Si hay indicios que lleven al médico a sospechar que el bebé tiene un riesgo aumentado de tener algún síndrome, se puede recomendar continuar con exámenes que confirmen o descarten la sospecha, como amniocentesis, cariotipo o NIPT, si los padres lo desean."
        }
      ],
      faq: [
        { q: "¿Necesito preparación para el examen?", a: "No es necesario ayuno ni vejiga llena." },
        { q: "¿Es seguro para el bebé?", a: "¡Sí! El ultrasonido no utiliza rayos X." },
        { q: "¿Necesito una solicitud médica para realizar el examen?", a: "Sí, el ultrasonido con Translucencia Nucal generalmente es solicitado por el obstetra." },
        { q: "¿Cuánto tiempo tarda el ultrasonido con TN?", a: "No hay un tiempo determinado, ya que el médico depende completamente de la posición del bebé y de la necesidad de evaluaciones adicionales." }
      ]
    }
  },
  "obstetrico-doppler": {
    en: {
      title: "Obstetric with Doppler",
      shortDesc: "Assessment of fetal circulation and well-being.",
      hero: {
        tagline: "Assessment of fetal circulation and well-being.",
        intro: "Ultrasound with Doppler is technology that evaluates blood flow in the arteries of the mother and baby. It allows analysis of blood circulation in real time, providing valuable information about the exchange of nutrients and oxygen between mother and baby."
      },
      sections: [
        {
          kind: "list",
          title: "What are the main indications?",
          items: ["Monitoring of pregnancies with intrauterine growth restriction (IUGR), verifying if the baby is receiving necessary oxygen and nutrients.", "Identification of 60 to 70% of pregnant women at increased risk of developing preeclampsia.", "Screening for fetal anemia through the study of the Middle Cerebral Artery (MCA)."]
        },
        {
          kind: "paragraph",
          title: "When should it be performed?",
          body: "Usually ordered after 28 weeks, when the baby is already considered viable. It can be requested before 28 weeks in specific situations, such as history of preeclampsia, growth restriction, or other risk conditions."
        },
        {
          kind: "paragraph",
          title: "Why perform this exam?",
          body: "Because it is capable of detecting signs of fetal distress or growth restriction, it helps identify risks of preeclampsia so interventions can be made, and detects conditions early, allowing life-saving interventions."
        },
        {
          kind: "paragraph",
          title: "How is it performed?",
          body: "Performed with conventional ultrasound but with the Doppler function activated to analyze flow within arteries. The uterine arteries assess preeclampsia risk and whether maternal blood is reaching the placenta without difficulty."
        }
      ],
      faq: [
        { q: "Is the exam mandatory in all pregnancies?", a: "No, but it is highly recommended in high-risk pregnancies or when signs of complications are present." },
        { q: "Do I need preparation for the exam?", a: "No, ultrasound with Doppler does not require any special preparation." },
        { q: "Does it replace morphological ultrasound?", a: "No, each exam has different purposes. Doppler evaluates blood flow, while morphological analyzes baby anatomy." },
        { q: "Can it be performed more than once during pregnancy?", a: "Yes, it can be repeated as needed by the doctor to monitor pregnancy progression." }
      ]
    },
    es: {
      title: "Obstétrico con Doppler",
      shortDesc: "Evaluación de la circulación y el bienestar fetal.",
      hero: {
        tagline: "Evaluación de la circulación y el bienestar fetal.",
        intro: "El ultrasonido con Doppler es una tecnología que evalúa el flujo sanguíneo en las arterias de la madre y el bebé. Permite analizar la circulación sanguínea en tiempo real, proporcionando información valiosa sobre el intercambio de nutrientes y oxígeno entre la madre y el bebé."
      },
      sections: [
        {
          kind: "list",
          title: "¿Cuáles son las principales indicaciones?",
          items: ["Seguimiento de embarazos con restricción del crecimiento intrauterino (RCIU), verificando si el bebé está recibiendo oxígeno y nutrientes necesarios.", "Identificación del 60 a 70% de las gestantes con riesgo aumentado de desarrollar preeclampsia.", "Detección de anemia fetal a través del estudio de la Arteria Cerebral Media (ACM)."]
        },
        {
          kind: "paragraph",
          title: "¿Cuándo debe realizarse?",
          body: "Generalmente se solicita después de 28 semanas, cuando el bebé ya se considera viable. Puede solicitarse antes de 28 semanas en situaciones específicas, como antecedentes de preeclampsia, restricción del crecimiento u otras condiciones de riesgo."
        },
        {
          kind: "paragraph",
          title: "¿Por qué realizar el examen?",
          body: "Porque es capaz de detectar signos de sufrimiento fetal o restricción del crecimiento, ayuda a identificar riesgos de preeclampsia para que se puedan realizar intervenciones, y detecta condiciones tempranamente, permitiendo intervenciones que salvan vidas."
        },
        {
          kind: "paragraph",
          title: "¿Cómo se realiza?",
          body: "Se realiza con un ultrasonido convencional, pero con la función Doppler activada para analizar el flujo dentro de las arterias. Las arterias uterinas evalúan el riesgo de preeclampsia y si la sangre materna está llegando a la placenta sin dificultad."
        }
      ],
      faq: [
        { q: "¿Es el examen obligatorio en todos los embarazos?", a: "No, pero se recomienda ampliamente en embarazos de alto riesgo o cuando hay signos de complicaciones." },
        { q: "¿Necesito preparación para el examen?", a: "No, el ultrasonido con Doppler no requiere ninguna preparación especial." },
        { q: "¿Reemplaza el ultrasonido morfológico?", a: "No, cada examen tiene propósitos diferentes. El Doppler evalúa el flujo sanguíneo, mientras que el morfológico analiza la anatomía del bebé." },
        { q: "¿Puede realizarse más de una vez durante el embarazo?", a: "Sí, puede repetirse según sea necesario por el médico para monitorear la progresión del embarazo." }
      ]
    }
  }
,
  "morfologico-1-trimestre": {
    en: {
      title: "Morphological Ultrasound 1st Trimester",
      shortDesc: "Detailed evaluation of fetal anatomy between 12 and 13 weeks 6 days.",
      hero: { tagline: "The beginning of essential monitoring.", intro: "Morphological exams are more detailed exams because we study the morphology (shape and size) of organs." },
      sections: [
        { kind: "paragraph", title: "Why is it so important?", body: "Essential to assess initial development, identifying possible malformations and calculating syndrome risk through nuchal translucency and other markers. Also allows early screening of preeclampsia." },
        { kind: "paragraph", title: "When should it be performed?", body: "Should be performed when baby measures between 12 and 13 weeks 6 days, or between 4.5 and 8.4 cm from head to buttocks (CCN)." },
        { kind: "paragraph", title: "What if there's a problem with my baby?", body: "If there are signs of increased risk, a consultation with Fetal Medicine may be recommended. It is important to remember that other fetal conditions can lead to increased nuca: anemia, infections, metabolic disorders, or simply fetal adaptation." }
      ],
      faq: [
        { q: "Is it the same as obstetric ultrasound with NT?", a: "Although both measure nuca and calculate syndrome risk, they are not the same. Obstetric is basic and simpler; morphological is much more complete." },
        { q: "Do I need preparation?", a: "No fasting or full bladder required." },
        { q: "Is it safe?", a: "Yes! Ultrasound does not use X-rays." },
        { q: "Do I need a medical request?", a: "Yes, morphological ultrasound is usually requested by the obstetrician." },
        { q: "How long does it take?", a: "There is no set time. Allow extra time and do not schedule appointments right after." }
      ]
    },
    es: {
      title: "Morfológico 1º Trimestre",
      shortDesc: "Evaluación detallada de la anatomía fetal entre 12 y 13 semanas 6 días.",
      hero: { tagline: "El inicio de un acompañamiento esencial.", intro: "Los exámenes morfológicos son exámenes más detallados donde estudiamos la morfología (forma y tamaño) de los órganos." },
      sections: [
        { kind: "paragraph", title: "¿Por qué es tan importante?", body: "Es esencial para evaluar el desarrollo inicial del bebé, identificando posibles malformaciones y calculando el riesgo de síndrome a través de translucencia nucal y otros marcadores. También permite rastreamiento temprano de preeclampsia." },
        { kind: "paragraph", title: "¿Cuándo debe realizarse?", body: "Debe realizarse cuando el bebé mide entre 12 y 13 semanas 6 días, o entre 4,5 y 8,4 cm de la cabeza a las nalgas (CCN)." },
        { kind: "paragraph", title: "¿Qué si hay algún problema?", body: "Si hay indicios de riesgo aumentado, puede indicarse consulta con Medicina Fetal. Es importante recordar que otras condiciones fetales pueden llevar al aumento de la nuca: anemia, infecciones, problemas metabólicos, o simplemente adaptación fetal." }
      ],
      faq: [
        { q: "¿Es lo mismo que el ultrasonido obstétrico con TN?", a: "Aunque ambos miden la nuca y calculan riesgo de síndrome, no son el mismo examen. El obstétrico es básico y simple; el morfológico es mucho más completo." },
        { q: "¿Necesito preparación?", a: "No es necesario ayuno ni vejiga llena." },
        { q: "¿Es seguro?", a: "¡Sí! El ultrasonido no utiliza rayos X." },
        { q: "¿Necesito solicitud médica?", a: "Sí, el ultrasonido morfológico generalmente es solicitado por el obstetra." },
        { q: "¿Cuánto tiempo tarda?", a: "No existe tiempo determinado. Vaya con tiempo y no programe citas inmediatamente después." }
      ]
    }
  },
  "morfologico-2-trimestre": {
    en: {
      title: "Morphological Ultrasound 2nd Trimester",
      shortDesc: "Detailed assessment of fetal development between 21 and 24 weeks.",
      hero: { tagline: "Detailed assessment of fetal development.", intro: "Morphological exams are more detailed exams where we study morphology (shape and size) of organs." },
      sections: [
        { kind: "paragraph", title: "Why is it so important?", body: "Crucial to assess in detail formation of baby's organs, identifying possible structural alterations. Some malformations can be treated surgically within the uterus, so early diagnosis is fundamental." },
        { kind: "paragraph", title: "When should it be performed?", body: "Should be performed between 21 and 24 weeks. Baby is already larger, allowing detailed evaluation of organs that were very small before, such as heart and brain." },
        { kind: "paragraph", title: "What are the benefits?", body: "Verifies development of organs such as brain, heart, kidneys, and spine. Detects malformations and conditions that can be treated early or monitored carefully during pregnancy." },
        { kind: "paragraph", title: "What tests can be associated?", body: "Doppler of uterine arteries is fundamental to assess whether placenta is receiving blood from mother without difficulty. Cervical measurement is also important." }
      ],
      faq: [
        { q: "Is preparation necessary?", a: "No fasting or full bladder needed. Avoid oils on belly for 2 days before exam." },
        { q: "Why measure the cervix?", a: "Cervical measurement helps identify premature delivery risks. Short cervix may need progesterone or cerclage." },
        { q: "What is Doppler of uterine arteries?", a: "Evaluates blood flow in uterine arteries. If resistance is present, increases mother's risk of preeclampsia and fetal growth restriction." },
        { q: "Can I find out baby's gender?", a: "Yes, most babies show gender in this exam. Very difficult for baby not to show, but possible." },
        { q: "How long does it take?", a: "No set time. Doctor depends on baby's position and need for additional evaluations." },
        { q: "Does morphological replace fetal echocardiography?", a: "No, they are different exams. Morphological evaluates basic heart anatomy; echocardiography focuses on function and valves." },
        { q: "Do I need medical request?", a: "Yes, morphological is usually requested by obstetrician as one of the main exams." },
        { q: "Can all baby conditions be detected?", a: "Exam is more detailed but cannot detect 100% of genetic alterations. Some may require additional genetic tests." }
      ]
    },
    es: {
      title: "Morfológico 2º Trimestre",
      shortDesc: "Evaluación minuciosa del desarrollo del bebé entre 21 y 24 semanas.",
      hero: { tagline: "Evaluación minuciosa del desarrollo del bebé.", intro: "Los exámenes morfológicos son exámenes más detallados donde estudiamos la morfología (forma y tamaño) de los órganos." },
      sections: [
        { kind: "paragraph", title: "¿Por qué es tan importante?", body: "Es crucial evaluar detalladamente la formación de los órganos del bebé, identificando posibles alteraciones estructurales. Algunas malformaciones pueden tratarse quirúrgicamente dentro del útero, por eso el diagnóstico precoz es fundamental." },
        { kind: "paragraph", title: "¿Cuándo debe realizarse?", body: "Debe realizarse entre 21 y 24 semanas. El bebé ya está más grande, permitiendo evaluar con detalle órganos que eran muy pequeños antes, como corazón y cerebro." },
        { kind: "paragraph", title: "¿Cuáles son los beneficios?", body: "Verifica el desarrollo de órganos como cerebro, corazón, riñones y columna. Detecta malformaciones y condiciones que pueden tratarse precozmente o acompañarse con atención durante el embarazo." },
        { kind: "paragraph", title: "¿Qué exámenes pueden asociarse?", body: "El Doppler de las Arterias Uterinas es fundamental para evaluar si la placenta está recibiendo sangre de la madre sin dificultad. La medida del colo también es importante." }
      ],
      faq: [
        { q: "¿Es necesario preparación?", a: "No es necesario ayuno ni vejiga llena. Evite aceites en la barriga 2 días antes del examen." },
        { q: "¿Por qué medir el colo?", a: "La medida del colo ayuda a identificar riesgos de parto prematuro. Colo corto puede necesitar progesterona o cerclaje." },
        { q: "¿Qué es Doppler de arterias uterinas?", a: "Evalúa el flujo sanguíneo en las arterias del útero. Si hay resistencia, aumenta el riesgo de preeclampsia y restricción del crecimiento fetal." },
        { q: "¿Puedo saber el sexo del bebé?", a: "Sí, la mayoría de los bebés muestran el sexo en este examen. Muy difícil que no muestren, pero es posible." },
        { q: "¿Cuánto tiempo tarda?", a: "No hay tiempo determinado. El médico depende de la posición del bebé y la necesidad de evaluaciones adicionales." },
        { q: "¿El morfológico reemplaza el ecocardiograma fetal?", a: "No, son exámenes diferentes. Morfológico evalúa la anatomía básica del corazón; ecocardiograma se enfoca en función y válvulas." },
        { q: "¿Necesito solicitud médica?", a: "Sí, el morfológico generalmente es solicitado por el obstetra como uno de los principales exámenes." },
        { q: "¿Pueden detectarse todas las condiciones?", a: "El examen es más detallado pero no puede detectar el 100% de alteraciones genéticas. Algunas pueden requerir pruebas genéticas adicionales." }
      ]
    }
  },
  "morfologico-3-trimestre": {
    en: {
      title: "Morphological Ultrasound 3rd Trimester",
      shortDesc: "Assessment of fetal development in the final weeks of pregnancy.",
      hero: { tagline: "Assessing baby's development in the final stretch.", intro: "Morphological exams are detailed assessments where we study organ morphology (shape and size)." },
      sections: [
        { kind: "paragraph", title: "Why is it so important?", body: "Detailed assessment that checks baby's development in final pregnancy phase. Analyzes fetal anatomy, amniotic fluid amount, placental maturity. Useful to assess final development and organ maturation, especially brain, kidneys, and intestine." },
        { kind: "paragraph", title: "When should it be performed?", body: "Generally performed between 32 and 36 weeks of gestation, or according to pregnancy risk degree." },
        { kind: "paragraph", title: "Does it evaluate everything like 2nd trimester?", body: "As pregnancy progresses, baby grows and makes detailed visualization difficult. Structures like fingers, leg-foot angle, and spine may not be evaluated as before. Main purpose is to look for brain, heart, and genitourinary changes." }
      ],
      faq: [
        { q: "Is exam mandatory?", a: "Not mandatory, but highly recommended by obstetrician for complete monitoring." },
        { q: "Does it need preparation?", a: "No, 3rd trimester morphological does not require special preparation." },
        { q: "Can exam identify baby's weight?", a: "Yes, exam estimates baby's weight and size based on fetal measurements." },
        { q: "Can it be performed more than once?", a: "Yes, in high-risk pregnancies, exam can be repeated to monitor fetal development." },
        { q: "How long does it take?", a: "No set time. Depends entirely on baby's position and need for additional evaluations." }
      ]
    },
    es: {
      title: "Morfológico 3º Trimestre",
      shortDesc: "Evaluación del desarrollo del bebé en la reta final de la gestación.",
      hero: { tagline: "Evaluando el desarrollo del bebé en la reta final.", intro: "Los exámenes morfológicos son evaluaciones detalladas donde estudiamos la morfología (forma y tamaño) de los órganos." },
      sections: [
        { kind: "paragraph", title: "¿Por qué es tan importante?", body: "Evaluación detallada que verifica el desarrollo del bebé en la fase final del embarazo. Analiza la anatomía fetal, cantidad de líquido amniótico, madurez placentaria. Útil para evaluar desarrollo final y maduración de órganos, especialmente cerebro, riñones e intestino." },
        { kind: "paragraph", title: "¿Cuándo debe realizarse?", body: "Generalmente se realiza entre la 32ª y 36ª semana de gestación, o conforme al grado de riesgo gestacional." },
        { kind: "paragraph", title: "¿Evalúa todo como en el 2º trimestre?", body: "Con el paso de la gestación, el bebé crece y dificulta la visualización de detalles. Estructuras como dedos, ángulo pierna-pie y columna pueden no ser evaluadas como antes. El propósito principal es buscar cambios cerebrales, cardíacos y genitourinarios." }
      ],
      faq: [
        { q: "¿El examen es obligatorio?", a: "No es obligatorio, pero muy recomendado por el obstetra para acompañamiento completo." },
        { q: "¿Necesita preparación?", a: "No, el morfológico del 3º trimestre no exige preparo especial." },
        { q: "¿Puede identificar el peso del bebé?", a: "Sí, el examen estima el peso y tamaño del bebé basándose en medidas fetales." },
        { q: "¿Puede realizarse más de una vez?", a: "Sí, en embarazos de alto riesgo, el examen puede repetirse para monitorear el desarrollo." },
        { q: "¿Cuánto tiempo tarda?", a: "No hay tiempo determinado. Depende enteramente de la posición del bebé y necesidad de evaluaciones adicionales." }
      ]
    }
  }
,
  "perfil-biofisico-fetal": {
    en: {
      title: "Fetal Biophysical Profile (BPP)",
      shortDesc: "Assessment of fetal vitality in the third trimester.",
      hero: { tagline: "Assessment of fetal well-being.", intro: "Ultrasound to assess baby well-being inside uterus. Combines real-time observations with amniotic fluid measurement, verifying if baby receives oxygen and nutrients adequately." },
      sections: [
        { kind: "paragraph", title: "What is it for", body: "Purpose is to monitor baby's vitality, especially in high-risk pregnancies. Safe and non-invasive way to ensure baby is well and can develop in uterus peacefully." },
        { kind: "list", title: "How it is performed", items: ["Baby's body movements", "Breathing movements (respiration simulation)", "Fetal tone — muscle strength and flexibility", "Amniotic fluid index"], footer: "Each item scores 0 (absent) or 2 (present). Final result ranges from 0 to 8." },
        { kind: "list", title: "How it is interpreted", items: ["8/8 — normal result, indicating baby is well oxygenated.", "6/8 — doubtful result; cardiotocography may be necessary.", "4/8 or less — abnormal result, indicating possible fetal distress."] }
      ]
    },
    es: {
      title: "Perfil Biofísico Fetal (PBF)",
      shortDesc: "Evaluación de la vitalidad fetal en el tercer trimestre.",
      hero: { tagline: "Evaluación del bienestar fetal.", intro: "Ultrasonido para evaluar el bienestar del bebé dentro del útero. Combina observaciones en tiempo real con medición de líquido amniótico, verificando si el bebé recibe oxígeno y nutrientes adecuadamente." },
      sections: [
        { kind: "paragraph", title: "Para que sirve", body: "El propósito es acompañar la vitalidad del bebé, especialmente en embarazos de alto riesgo. Forma segura y no invasiva de garantizar que el bebé está bien y puede desarrollarse en el útero tranquilamente." },
        { kind: "list", title: "Cómo se realiza", items: ["Movimientos corporales del bebé", "Movimientos respiratorios (simulación de respiración)", "Tono fetal — fuerza y flexibilidad de los músculos", "Índice de líquido amniótico"], footer: "Cada ítem obtiene puntuación 0 (ausente) o 2 (presente). El resultado final varía de 0 a 8." },
        { kind: "list", title: "Cómo se interpreta", items: ["8/8 — resultado normal, indicando que el bebé está bien oxigenado.", "6/8 — resultado dudoso; puede ser necesaria cardiotocografía.", "4/8 o menos — resultado anormal, indicando posible sufrimiento fetal."] }
      ]
    }
  },
  "ecocardiograma-fetal": {
    en: {
      title: "Fetal Echocardiogram",
      shortDesc: "Detailed evaluation of baby's heart anatomy and function.",
      hero: { tagline: "An exam that saves lives.", intro: "Specialized ultrasound that evaluates baby's heart in detail while in uterus. Studies anatomy, functioning, and blood flow of fetal heart." },
      sections: [
        { kind: "paragraph", title: "Why is it so important", body: "Fundamental to detect congenital cardiac anomalies — most common malformations in babies. Early diagnosis allows planning interventions at birth, ensures appropriate monitoring, and helps choose best delivery place if specialist support needed." },
        { kind: "highlight", title: "When should it be performed", body: "Screening for cardiac abnormalities performed between 24 and 30 weeks when baby's heart is sufficiently developed. In specific cases—suspicion of anomalies or family history—exam can be requested earlier or repeated throughout pregnancy." },
        { kind: "list", title: "Benefits", items: ["Immediate care at birth — some conditions need treatment right after birth.", "More emotional preparation for parents.", "Greater chance of baby recovery when treatment begins early.", "Fewer complications and future health costs."] },
        { kind: "highlight", title: "Indication", body: "Indicated for all pregnant women, especially mothers with diabetes, lupus, twin pregnancy, or family history of heart disease." }
      ],
      faq: [
        { q: "Who should undergo fetal echocardiography?", a: "All pregnant women, especially those with diabetes, lupus, twin pregnancy, or family history of heart disease." },
        { q: "Is exam safe?", a: "Yes, non-invasive and completely safe, using conventional ultrasound technology." },
        { q: "How long does it take?", a: "On average 1 hour, varying depending on baby position." },
        { q: "Does it replace morphological ultrasound?", a: "No, they are different exams. Morphological evaluates complete formation and anatomy; echocardiography focuses on heart function." },
        { q: "What happens if alteration is detected?", a: "Doctor discusses diagnosis with parents and refers for pediatric cardiologist follow-up if necessary." },
        { q: "Does exam need preparation?", a: "No specific preparation. Mother can eat and drink normally." }
      ]
    },
    es: {
      title: "Ecocardiograma Fetal",
      shortDesc: "Evaluación detallada de la anatomía y función del corazón del bebé.",
      hero: { tagline: "Un examen que salva vidas.", intro: "Ultrasonido especializado que evalúa detalladamente el corazón del bebé dentro del útero. Estudia la anatomía, funcionamiento y flujo sanguíneo del corazón fetal." },
      sections: [
        { kind: "paragraph", title: "Por qué es tan importante", body: "Es fundamental para detectar anomalías cardíacas congénitas — las malformaciones más comunes en los bebés. El diagnóstico precoz permite planificar intervenciones en el nacimiento, garantiza acompañamiento adecuado, y ayuda a elegir el mejor lugar para el parto si se necesita suporte especializado." },
        { kind: "highlight", title: "Cuándo debe realizarse", body: "El rastreamiento de cardiopatías se realiza entre 24 y 30 semanas cuando el corazón del bebé está suficientemente desarrollado. En casos específicos—sospecha de anomalías o antecedentes familiares—el examen puede solicitarse más pronto o repetirse durante el embarazo." },
        { kind: "list", title: "Beneficios", items: ["Atendimiento inmediato al nacer — algunas condiciones necesitan tratamiento inmediatamente después del parto.", "Más preparo emocional para los padres.", "Mayor chance de recuperación del bebé cuando el tratamiento comienza pronto.", "Menos complicaciones y costos de salud en el futuro."] },
        { kind: "highlight", title: "Indicación", body: "Indicado para todas las gestantes, especialmente madres con diabetes, lupus, embarazo gemelar, o antecedentes familiares de cardiopatías." }
      ],
      faq: [
        { q: "¿Quién debe realizar el ecocardiograma fetal?", a: "Todas las gestantes, especialmente aquellas con diabetes, lupus, embarazo gemelar, o antecedentes familiares de cardiopatías." },
        { q: "¿El examen es seguro?", a: "Sí, no invasivo y totalmente seguro, usando tecnología de ultrasonido convencional." },
        { q: "¿Cuánto tiempo tarda?", a: "En promedio 1 hora, variando según la posición del bebé." },
        { q: "¿Reemplaza el ultrasonido morfológico?", a: "No, son exámenes diferentes. Morfológico evalúa la formación completa y anatomía; ecocardiograma se enfoca en función cardíaca." },
        { q: "¿Qué sucede si se detecta una alteración?", a: "El médico discute el diagnóstico con los padres y remite para seguimiento con cardiólogo pediátrico si es necesario." },
        { q: "¿El examen necesita preparación?", a: "No hay preparación específica. La madre puede comer y beber normalmente." }
      ]
    }
  }
,
  "colo-uterino": {
    en: {
      title: "Cervical Measurement (Cervicometry)",
      shortDesc: "Transvaginal assessment of cervical length to assess premature delivery risk.",
      hero: { tagline: "An exam that saves lives.", intro: "Cervix is the lower part of uterus connecting to vagina. During pregnancy, it plays a crucial role, functioning as protective barrier for baby." },
      sections: [
        { kind: "paragraph", title: "Relationship with premature delivery", body: "Direct relationship between cervical measurement and premature delivery risk. Cervix is normal when length greater than 2.5 cm and short when less than 2.5 cm—short cervixes have increased premature delivery risk. Some pregnant women have cervical incompetence, a condition where cervix cannot support growing baby weight." },
        { kind: "highlight", title: "When it should be performed", body: "Can be performed at any pregnancy period, but to assess premature delivery risk recommended between 20 and 24 weeks with 2nd Trimester Morphological. In specific cases—history of complications or twin pregnancy—can be done earlier per medical guidance." },
        { kind: "paragraph", title: "Why is it so important", body: "Prematurity is leading cause of fetal death in world. Cervical assessment monitors high-risk pregnancies and assesses need for interventions such as cerclage, which prevents early cervical dilation. Exam identifies up to 70% of women who will have premature delivery." },
        { kind: "list", title: "How to interpret measurement", items: ["Normal cervix — greater than 2.5 cm. Premature delivery risk: 3%.", "Short cervix — less than 2.5 cm. Premature delivery risk: 20%.", "Very short cervix — less than 1.0 cm. Premature delivery risk: 50%."] },
        { kind: "paragraph", title: "Doesn't touch see the same thing?", body: "Unfortunately not. By touch, obstetrician perceives if external opening is closed and if cervix is soft or hard. Ultrasound is only means to evaluate internal opening. Many times touch is normal, but cervix is already open inside—phenomenon called funneling. Early identification of short cervix can save baby's life." }
      ]
    },
    es: {
      title: "Medida del Colo Uterino (Cervicometría)",
      shortDesc: "Evaluación transvaginal del comprimento del colo para riesgo de parto prematuro.",
      hero: { tagline: "Un examen que salva vidas.", intro: "El colo del útero es la parte inferior del útero que se conecta a la vagina. Durante el embarazo, desempeña un papel crucial, funcionando como una barrera protectora para el bebé." },
      sections: [
        { kind: "paragraph", title: "Relación con el parto prematuro", body: "Existe relación directa entre la medida del colo del útero y el riesgo de prematuridad. El colo es normal cuando su comprimento es mayor que 2,5 cm y corto cuando menor que 2,5 cm—colos cortos tienen riesgo aumentado de parto antes de hora. Algunas gestantes tienen incompetencia cervical, condición en que el colo no consigue soportar el peso del bebé en crecimiento." },
        { kind: "highlight", title: "Cuándo debe realizarse", body: "Puede realizarse en cualquier período de la gestación, pero para evaluar riesgo de parto prematuro se recomienda entre 20 y 24 semanas con Morfológico del 2º Trimestre. En casos específicos—antecedentes de complicaciones o embarazo gemelar—puede hacerse antes per orientación médica." },
        { kind: "paragraph", title: "Por qué es tan importante", body: "La prematuridad es la principal causa de muerte fetal en el mundo. La evaluación del colo monitorea embarazos de alto riesgo y evalúa la necesidad de intervenciones como cerclaje, que evita la dilatación precoz del colo. El examen identifica hasta 70% de las mujeres que tendrán parto prematuro." },
        { kind: "list", title: "Cómo interpretar la medida", items: ["Colo normal — mayor que 2,5 cm. Riesgo de prematuridad: 3%.", "Colo corto — menor que 2,5 cm. Riesgo de prematuridad: 20%.", "Colo muy corto — menor que 1,0 cm. Riesgo de prematuridad: 50%."] },
        { kind: "paragraph", title: "¿El toque no ve la misma cosa?", body: "Infelizmente no. Por el toque, el obstetra percibe si el orifício externo está cerrado y si el colo está suave o duro. El ultrasonido es el único medio de evaluar el orifício interno. Muchas veces el toque está normal, pero el colo ya está abierto por dentro—fenómeno llamado afunilamiento. La identificación precoz del colo corto puede salvar la vida del bebé." }
      ]
    }
  },
  "cerclagem": {
    en: {
      title: "Cervical Cerclage",
      shortDesc: "Procedure that reinforces cervix to reduce premature delivery risk.",
      hero: { tagline: "A reinforcement to protect baby.", intro: "Cerclage is a surgical procedure that places suture around cervix, keeping it closed during pregnancy. Indicated when increased premature delivery risk due to cervical incompetence (ICC), identified on ultrasound or previous CAF." },
      sections: [
        { kind: "paragraph", title: "When is it indicated", body: "Can be indicated in three main situations: history of miscarriage or recurrent preterm delivery in 2nd trimester, previous diagnosis of cervical incompetence, or identification of short cervix during cervicometry monitoring. Decision is always individualized by obstetrician based on clinical history and ultrasound findings." },
        { kind: "highlight", title: "When is it performed", body: "Usually between 12 and 24 weeks of gestation, according to indication. In elective cases (history of cervical incompetence), usually done in early 2nd trimester. In cases of short cervix detected on ultrasound, can be therapeutically indicated during follow-up." },
        { kind: "list", title: "The role of ultrasound", items: ["Before procedure — confirms indication through cervical measurement and anatomical assessment.", "In planning — evaluates fetal vitality and rules out contraindications.", "After cerclage — monitors cervical length above suture, suture position, and baby's well-being."] },
        { kind: "paragraph", title: "Care after cerclage", body: "After surgery, obstetrician advises appropriate rest, restrictions on physical activity and sexual relations, and more frequent clinical and ultrasound monitoring. Suture removal is usually performed between 36 and 37 weeks." }
      ]
    },
    es: {
      title: "Cerclaje del Colo Uterino",
      shortDesc: "Procedimiento que refuerza el colo del útero para reducir el riesgo de parto prematuro.",
      hero: { tagline: "Un refuerzo para proteger al bebé.", intro: "El cerclaje es un procedimiento quirúrgico que coloca una sutura alrededor del colo del útero, manteniéndolo cerrado durante la gestación. Se indica cuando hay riesgo aumentado de parto prematuro por incompetencia ístmo-cervical (IIC)." },
      sections: [
        { kind: "paragraph", title: "Cuándo se indica", body: "Puede indicarse en tres situaciones principales: antecedentes de pérdidas gestacionales o partos prematuros recurrentes en 2º trimestre, diagnóstico previo de incompetencia ístmo-cervical, o identificación de colo uterino corto durante acompañamiento de cervicometría. La decisión es siempre individualizada por el obstetra basada en el histórico clínico y hallazgos ultrassonográficos." },
        { kind: "highlight", title: "Cuándo se realiza", body: "Generalmente entre 12 y 24 semanas de gestación, conforme la indicación. En casos electivos (antecedentes de incompetencia cervical), suele realizarse en el inicio del 2º trimestre. En casos de colo corto detectado en ultrasonido, puede indicarse de forma terapéutica durante acompañamiento." },
        { kind: "list", title: "El papel del ultrasonido", items: ["Antes del procedimiento — confirma la indicación por medio de la medida del colo y evaluación anatómica.", "En la planificación — evalúa la vitalidad fetal y descarta contraindicaciones.", "Después de la cerclaje — acompaña el comprimento del colo arriba de la sutura, posición de la sutura, y bienestar del bebé."] },
        { kind: "paragraph", title: "Cuidados después de la cerclaje", body: "Después de la cirugía, el obstetra orienta el reposo adecuado, restricciones de actividad física y relaciones sexuales, y acompañamiento clínico y ultrassonográfico más frecuente. La retirada de la sutura habitualmente se realiza entre 36 y 37 semanas." }
      ]
    }
  }
,
  "transvaginal": {
    en: {
      title: "Transvaginal (Endovaginal)",
      shortDesc: "Detailed evaluation of uterus, ovaries, and endometrium.",
      hero: { tagline: "Gynecological and gestational health", intro: "Imaging exam with gentle transducer inserted into vaginal canal, obtaining detailed images of uterus, ovaries, endometrium, and cervix." },
      sections: [
        { kind: "list", title: "What it can detect", items: ["Uterus: fibroids, endometrial polyps, and uterine malformations.", "Endometrium: thickness and health of lining, especially in abnormal bleeding.", "Ovaries: cysts, tumors, and Polycystic Ovary Syndrome (PCOS).", "Infertility: cycle monitoring, ovulation, and conditions hindering conception.", "Pelvic pain or abnormal bleeding: investigation of persistent symptoms cause."] },
        { kind: "list", title: "Main obstetric indications", items: ["Confirmation of early pregnancy — fetal heartbeats and accurate dating.", "Identification of ectopic pregnancy.", "Evaluation of cervix — prediction of premature delivery risk.", "Monitoring of bleeding in early pregnancy."] },
        { kind: "paragraph", title: "Preparation", body: "No specific preparation. Recommended to empty bladder before exam for comfort." },
        { kind: "paragraph", title: "How it is performed", body: "Transducer is thin — much smaller than speculum used in cervical screening. Covered with sterile condom, receives lubricating gel, and gently inserted into vagina." }
      ],
      faq: [
        { q: "Does exam hurt?", a: "Generally painless. May cause slight discomfort during transducer insertion." },
        { q: "Do I need preparation?", a: "Just empty bladder before exam, unless doctor gives specific instructions." },
        { q: "Can I do exam while menstruating?", a: "Yes, menstruation does not interfere with exam." },
        { q: "Can pregnant women have transvaginal ultrasound?", a: "Yes, especially early in pregnancy, to monitor initial embryo development and evaluate cervix." }
      ]
    },
    es: {
      title: "Transvaginal (Endovaginal)",
      shortDesc: "Evaluación detallada del útero, ovarios y endométrio.",
      hero: { tagline: "Salud ginecológica y gestacional", intro: "Examen de imágenes con transductor delicado insertado en el canal vaginal, obteniendo imágenes detalladas del útero, ovarios, endométrio y colo del útero." },
      sections: [
        { kind: "list", title: "Lo que puede detectar", items: ["Útero: miomas, pólipos endometriales y malformaciones uterinas.", "Endométrio: espesor y salud del revestimiento, especialmente en sangrado anormal.", "Ovarios: quistes, tumores y Síndrome de Ovarios Poliquísticos (SOP).", "Infertilidad: monitoreo del ciclo, ovulación y condiciones que dificultan concepción.", "Dolor pélvico o sangrado anormal: investigación de la causa de síntomas persistentes."] },
        { kind: "list", title: "Principales indicaciones obstétricas", items: ["Confirmación del embarazo inicial — latidos cardíacos y datación correcta.", "Identificación de embarazo ectópico.", "Evaluación del colo del útero — predicción de riesgo de parto prematuro.", "Monitoreo de sangrados en el inicio del embarazo."] },
        { kind: "paragraph", title: "Preparo", body: "No hay preparo específico. Se recomienda vaciar la vejiga antes del examen para mayor comodidad." },
        { kind: "paragraph", title: "Cómo se realiza", body: "El transductor es delgado — mucho más pequeño que el espéculo usado en el cribado cervical. Está cubierto con condón estéril, recibe gel lubricante, e se inserta delicadamente en la vagina." }
      ],
      faq: [
        { q: "¿El examen duele?", a: "Generalmente es indoloro. Puede causar leve incomodidad durante la inserción del transductor." },
        { q: "¿Necesito preparo?", a: "Solo vaciar la vejiga antes del examen, salvo orientaciones específicas del médico." },
        { q: "¿Puedo hacer el examen menstruada?", a: "Sí, la menstruación no interfiere en el examen." },
        { q: "¿Las gestantes pueden hacer ultrasonido transvaginal?", a: "Sí, especialmente en el inicio del embarazo, para monitorear el desarrollo inicial del embrión y evaluar el colo del útero." }
      ]
    }
  },
  "transvaginal-3d": {
    en: {
      title: "Transvaginal 3D",
      shortDesc: "Three-dimensional visualization of uterus with resonance precision.",
      hero: { tagline: "Three-dimensional technology", intro: "Advanced technology that reconstructs three-dimensional images of female reproductive organs, with superior uterine detailing for more complete gynecological and obstetric diagnoses." },
      sections: [
        { kind: "list", title: "What it can detect", items: ["Uterine anomalies (septate, bicornuate, unicornuate, didelphys) with accuracy similar to magnetic resonance.", "Surgical planning of fibroids and other alterations."] },
        { kind: "paragraph", title: "Preparation", body: "Just empty bladder right before exam. For evaluation of malformations, recommended between 15th and 25th day of cycle (secretory period) in patients not using contraceptives. Those using pill can do anytime." },
        { kind: "paragraph", title: "How it is performed", body: "Transducer, covered with sterile condom and lubricating gel, gently inserted into vagina. Duration depends on complexity of alterations." }
      ],
      faq: [
        { q: "What is difference from conventional transvaginal?", a: "Conventional generates images in two planes; 3D reconstructs in three planes with greater detailing and precision." },
        { q: "Does exam hurt?", a: "Generally painless. May cause slight discomfort during transducer insertion." },
        { q: "Is 3D exam safe?", a: "Yes, as safe as conventional and does not use radiation." },
        { q: "Who should undergo 3D ultrasound?", a: "Mainly women with suspected uterine malformations or history of infertility." },
        { q: "Can I do it at any cycle phase?", a: "Yes, but for endometrial evaluation ideal is secretory period (between 15th and 25th day of cycle)." }
      ]
    },
    es: {
      title: "Transvaginal 3D",
      shortDesc: "Visualización tridimensional del útero con precisión de resonancia.",
      hero: { tagline: "Tecnología tridimensional", intro: "Tecnología avanzada que reconstruye imágenes tridimensionales de los órganos reproductivos femeninos, con detallamiento superior del útero para diagnósticos ginecológicos y obstétricos más completos." },
      sections: [
        { kind: "list", title: "Lo que puede detectar", items: ["Anomalías uterinas (septado, bicorno, unicorno, didelfo) con precisión similar a la resonancia magnética.", "Planificación quirúrgica de miomas y otras alteraciones."] },
        { kind: "paragraph", title: "Preparo", body: "Solo vaciar la vejiga justo antes del examen. Para evaluación de malformaciones, se recomienda realizar entre el 15º y 25º día del ciclo (período secretor) en pacientes que no usan anticonceptivos. Las que usan píldora pueden hacer en cualquier fase." },
        { kind: "paragraph", title: "Cómo se realiza", body: "El transductor, cubierto con condón estéril y gel lubricante, se inserta delicadamente en la vagina. La duración depende de la complejidad de las alteraciones." }
      ],
      faq: [
        { q: "¿Cuál es la diferencia del transvaginal convencional?", a: "El convencional genera imágenes en dos planos; el 3D reconstruye en tres planos con mayor detallamiento y precisión." },
        { q: "¿El examen duele?", a: "Generalmente es indoloro. Puede causar leve incomodidad durante la inserción del transductor." },
        { q: "¿El examen en 3D es seguro?", a: "Sí, es tan seguro como el convencional y no utiliza radiación." },
        { q: "¿Quién debe realizar el ultrasonido en 3D?", a: "Principalmente mujeres con sospecha de malformaciones uterinas o antecedentes de infertilidad." },
        { q: "¿Puedo hacer en cualquier fase del ciclo?", a: "Sí, pero para evaluación del endométrio lo ideal es el período secretor (entre el 15º y 25º día del ciclo)." }
      ]
    }
  }
,
  "ginecologico-doppler": {
    en: {
      title: "Transvaginal with Doppler",
      shortDesc: "Assessment of uterus, ovaries, and blood flow of pelvic structures.",
      hero: { tagline: "Ultrasound + vascular study", intro: "Combines simple transvaginal — assessing uterus and ovaries — with Doppler, which studies blood vessels (arteries) of pelvic structures." },
      sections: [
        { kind: "paragraph", title: "What it can detect", body: "Identifies cysts, fibroids, and polyps like conventional exam, and also assesses whether structure is well vascularized or presents abnormal vascularization — information fundamental to define conducts and type of indicated surgery." },
        { kind: "list", title: "Main indications", items: ["Complex cysts", "Ovarian tumors", "Assessment of fibroid vascularization"] },
        { kind: "paragraph", title: "Preparation", body: "No specific preparation. Recommended to empty bladder before exam for comfort." },
        { kind: "paragraph", title: "How it is performed", body: "Transducer, covered with sterile condom and lubricating gel, gently inserted into vagina." }
      ],
      faq: [
        { q: "Does exam hurt?", a: "Generally painless. May cause slight discomfort during transducer insertion." },
        { q: "Do I need preparation?", a: "Just empty bladder before exam, unless specific medical instructions." },
        { q: "Can I do exam while menstruating?", a: "Yes, menstruation does not interfere with exam." }
      ]
    },
    es: {
      title: "Transvaginal con Doppler",
      shortDesc: "Evaluación del útero, ovarios y del flujo sanguíneo de las estructuras pélvicas.",
      hero: { tagline: "Ultrasonido + estudio vascular", intro: "Asocia el transvaginal simple — que evalúa útero y ovarios — al Doppler, que estudia los vasos sanguíneos (arterias) de las estructuras pélvicas." },
      sections: [
        { kind: "paragraph", title: "Lo que puede detectar", body: "Identifica quistes, miomas y pólipos como el examen convencional, y aún evalúa si la estructura está bien vascularizada o presenta vascularización anormal — información fundamental para definir conductas y el tipo de cirugía indicada." },
        { kind: "list", title: "Principales indicaciones", items: ["Quistes complejos", "Tumores ováricos", "Evaluación de vascularización de miomas"] },
        { kind: "paragraph", title: "Preparo", body: "No hay preparo específico. Se recomienda vaciar la vejiga antes del examen para mayor comodidad." },
        { kind: "paragraph", title: "Cómo se realiza", body: "El transductor, cubierto con condón estéril y gel lubricante, se inserta delicadamente en la vagina." }
      ],
      faq: [
        { q: "¿El examen duele?", a: "Generalmente es indoloro. Puede causar leve incomodidad durante la inserción del transductor." },
        { q: "¿Necesito preparo?", a: "Solo vaciar la vejiga antes del examen, salvo orientación médica específica." },
        { q: "¿Puedo hacer el examen menstruada?", a: "Sí, la menstruación no interfiere en el examen." }
      ]
    }
  },
  "rastreamento-ovulacao": {
    en: {
      title: "Ovulation Tracking",
      shortDesc: "Serial monitoring of ovulatory cycle for conception.",
      hero: { tagline: "Important help with conjugal infertility", intro: "Fundamental exam for monitoring ovulatory cycle, especially in women who want to become pregnant or undergoing infertility treatment. Provides precise information on follicle development and timing closest to ovulation." },
      sections: [
        { kind: "paragraph", title: "How exam works", body: "Generally start between 8th and 10th day of menstrual cycle (may vary). Ultrasound monitors follicle growth and endometrial thickness. 3 to 5 exams performed at 2 to 3-day intervals to identify ovulation. With this assessment, doctor advises couple on best time to have intercourse (programmed intercourse)." },
        { kind: "paragraph", title: "Confirmation of ovulation", body: "Exam can confirm follicle rupture and corpus luteum formation, which indicates that ovulation has occurred." },
        { kind: "paragraph", title: "How it is performed", body: "Transducer, covered with sterile condom and lubricating gel, gently inserted into vagina." }
      ],
      faq: [
        { q: "How many ultrasound sessions are necessary?", a: "Usually 3 to 4 exams, depending on cycle and treatment." },
        { q: "Is exam painful?", a: "No. Transvaginal is painless — may cause slight discomfort, but well tolerated." },
        { q: "Is ovulation tracking indicated for all women?", a: "No. Indicated for women undergoing fertility treatment or having difficulty becoming pregnant." },
        { q: "How does exam help in fertility treatments?", a: "Identifies timing closest to ovulation, helping schedule sexual intercourse, inseminations, or egg collection." },
        { q: "Is fasting or preparation necessary?", a: "No, exam does not require special preparation." }
      ]
    },
    es: {
      title: "Rastreamento de Ovulación",
      shortDesc: "Acompañamiento seriado del ciclo ovulatório para concepción.",
      hero: { tagline: "Ayuda importante en la infertilidad conjugal", intro: "Examen fundamental para monitorear el ciclo ovulatorio, especialmente en mujeres que desean engravidar o están en tratamiento para infertilidad. Ofrece informaciones precisas sobre el desarrollo de los folículos y el momento más próximo de la ovulación." },
      sections: [
        { kind: "paragraph", title: "Cómo funciona el examen", body: "Generalmente iniciamos entre el 8º y 10º día del ciclo menstrual (puede variar). El ultrasonido monitorea el crecimiento de los folículos y el espesor del endométrio. Se realizan de 3 a 5 exámenes con intervalos de 2 a 3 días para identificar la ovulación. Con esa evaluación, el médico orienta al casal sobre el mejor momento para tener relaciones (coito programado)." },
        { kind: "paragraph", title: "Confirmación de la ovulación", body: "El examen puede confirmar la ruptura del folículo y la formación del cuerpo lúteo, que indica que la ovulación ocurrió." },
        { kind: "paragraph", title: "Cómo se realiza", body: "El transductor, cubierto con condón estéril y gel lubricante, se inserta delicadamente en la vagina." }
      ],
      faq: [
        { q: "¿Cuántas sesiones de ultrasonido son necesarias?", a: "Generalmente de 3 a 4 exámenes, dependiendo del ciclo y del tratamiento." },
        { q: "¿El examen es doloroso?", a: "No. El transvaginal es indoloro — puede causar leve incomodidad, pero es muy bien tolerado." },
        { q: "¿El rastreamiento se indica para todas las mujeres?", a: "No. Se indica para mujeres en tratamiento de fertilidad o con dificultad para engravidar." },
        { q: "¿Cómo el examen ayuda en tratamientos de fertilidad?", a: "Identifica el momento más próximo de la ovulación, ayudando a programar relaciones sexuales, inseminaciones o la coleta de óvulos." },
        { q: "¿Es necesario ayuno o algún preparo?", a: "No, el examen no exige preparo especial." }
      ]
    }
  }
,
  "endometriose-profunda": {
    en: {
      title: "Deep Endometriosis Mapping",
      shortDesc: "Transvaginal ultrasound with bowel preparation — exam of choice for diagnosis and staging.",
      hero: { tagline: "Diagnosis and staging of deep endometriosis", intro: "Transvaginal ultrasound with bowel preparation — also called endometriosis mapping — is exam of choice for diagnosing and staging deep endometriosis. Provides detailed map of pelvis, identifying exact location, size, and extent of lesions." },
      sections: [
        { kind: "paragraph", title: "Difference", body: "Unlike common pelvic ultrasound, this is multiparametric exam that evaluates in detail uterus, ovaries, fallopian tubes, bladder, ligaments, pelvic nerves, and bowel." },
        { kind: "paragraph", title: "Preparation", body: "Requires preparation the day before (light diet and use of laxatives) and rectal cleansing on day of exam. This care empties bowel and allows doctor to visualize even smallest infiltrative lesions." },
        { kind: "paragraph", title: "How it is performed", body: "Performed with transvaginal transducer and lasts from 40 minutes to 1 hour. During procedure, sliding and compression maneuvers are performed to check organ mobility and identify adhesions." },
        { kind: "list", title: "What it evaluates", items: ["Deep foci: nodules that invade adjacent tissues or organs, such as vagina, bladder, and rectum.", "Pelvic adhesions: detects whether organs are stuck to each other.", "Endometriomas: endometriosis cysts in ovaries and presence of adenomyosis.", "Urinary tract: evaluates kidneys and ureters to rule out obstructions."] },
        { kind: "highlight", title: "High precision", body: "When performed by specialist, has sensitivity between 95% and 100% to identify disease." },
        { kind: "paragraph", title: "Surgical planning", body: "Indispensable before any surgery. Knowing exactly where all lesions are and their thickness allows surgeon to gather appropriate medical team and define best technique for complete removal of foci." }
      ]
    },
    es: {
      title: "Mapeamento de Endometriosis Profunda",
      shortDesc: "Ultrasonido transvaginal con preparo intestinal — examen de elección para diagnóstico y estadiamiento.",
      hero: { tagline: "Diagnóstico y estadiamiento de la endometriosis profunda", intro: "El ultrasonido transvaginal con preparo intestinal — también llamado mapeamiento de endometriosis — es el examen de elección para diagnosticar y estadiar la endometriosis profunda. Proporciona un mapa detallado de la pelvis, identificando la ubicación exacta, el tamaño y la extensión de las lesiones." },
      sections: [
        { kind: "paragraph", title: "Diferencial", body: "Diferente del ultrasonido pélvico común, este es un examen multiparamétrico que evalúa en detalle útero, ovarios, trompas, vejiga, ligamentos, nervios pélvicos e intestino." },
        { kind: "paragraph", title: "Preparo", body: "Exige preparo en la víspera (dieta leve y uso de laxantes) y limpienza retal en el día del examen. Ese cuidado vacía el intestino y permite que la médica visualice hasta las menores lesiones infiltrativas." },
        { kind: "paragraph", title: "Cómo se realiza", body: "Hecho con transductor transvaginal y dura de 40 minutos a 1 hora. Durante el procedimiento se realizan maniobras de deslizamiento y compresión para verificar la movilidad de los órganos e identificar adherencias." },
        { kind: "list", title: "Lo que evalúa", items: ["Focos profundos: nódulos que invaden tejidos u órganos adyacentes, como vagina, vejiga y recto.", "Adherencias pélvicas: detecta si los órganos están pegados unos a los otros.", "Endometriomas: quistes de endometriosis en los ovarios y presencia de adenomiosis.", "Tracto urinario: evalúa riñones y uréteres para descartar obstrucciones."] },
        { kind: "highlight", title: "Alta precisión", body: "Cuando se realiza por especialista, posee sensibilidad entre 95% y 100% para identificar la enfermedad." },
        { kind: "paragraph", title: "Planificación quirúrgica", body: "Es indispensable antes de cualquier cirugía. Saber exactamente dónde están todas las lesiones y cuál es el espesor de ellas permite al cirujano reunir el equipo médico adecuado y definir la mejor técnica para la retirada completa de los focos." }
      ]
    }
  },
  "perineo": {
    en: {
      title: "Perineal Ultrasound",
      shortDesc: "Complete and dynamic assessment of female pelvic floor.",
      hero: { tagline: "Assessment of female pelvic floor", intro: "Specialized exam that precisely and dynamically assesses structures of pelvic floor. Real-time 3D images allow anatomical and functional study of muscles, sphincters, and pelvic organs — fundamental in diagnosis and monitoring of urogynaecological dysfunctions." },
      sections: [
        { kind: "list", title: "Clinical indications", items: ["Diagnosis of vaginal prolapses (urethrocele, rectocele, enterocele, and uterocele).", "Assessment of perineal and sphincteric tears, especially postpartum.", "Vulvodynia — pain in vulva.", "Investigation of urinary or fecal incontinence.", "Pre and post-operative assessment in patients with urethral sling.", "Study of pelvic floor dysfunctions in general."] },
        { kind: "paragraph", title: "How exam is performed", body: "Performed with 3D endovaginal probe, comfortably. During procedure, maneuvers are performed at rest and Valsalva, allowing assessment of pelvic structure behavior in different pressure and effort situations. Exam lasts on average 20 to 30 minutes." },
        { kind: "paragraph", title: "Is bowel preparation necessary?", body: "Yes — light bowel preparation without laxatives, just to reduce gas and improve visualization of structures. For assessment of perineal nodules, no preparation necessary." }
      ]
    },
    es: {
      title: "Ultrasonido Perineal",
      shortDesc: "Evaluación completa y dinámica del assoalho pélvico femenino.",
      hero: { tagline: "Evaluación del assoalho pélvico femenino", intro: "Examen especializado que evalúa, de forma precisa y dinámica, las estructuras del assoalho pélvico. Imágenes tridimensionales en tiempo real permiten el estudio anatómico y funcional de músculos, esfíncteres y órganos pélvicos — fundamental en el diagnóstico y acompañamiento de disfunciones uroginecológicas." },
      sections: [
        { kind: "list", title: "Indicaciones clínicas", items: ["Diagnóstico de prolapsos vaginales (uretrocele, rectocele, enterocele y uterocele).", "Evaluación de roturas perineales y esfincterianas, especialmente en el posparto.", "Vulvodinia — dolor en la vulva.", "Investigación de incontinencia urinaria o fecal.", "Evaluación preoperatoria y posoperatoria en pacientes con sling uretral.", "Estudio de disfunciones del assoalho pélvico en general."] },
        { kind: "paragraph", title: "Cómo se realiza el examen", body: "Realizado con sonda endovaginal 3D, de forma confortable. Durante el procedimiento se realizan maniobras en reposo y de Valsalva, permitiendo evaluar el comportamiento de las estructuras pélvicas en diferentes situaciones de presión y esfuerzo. El examen dura, en promedio, 20 a 30 minutos." },
        { kind: "paragraph", title: "¿Es necesario preparo intestinal?", body: "Sí — preparo intestinal leve, sin uso de laxantes, apenas para reducir gases y mejorar la visualización de las estructuras. Para evaluación de nódulos en el períneo, no es necesario preparo." }
      ]
    }
  }
,
  "abdome-total": {
    en: {
      title: "Complete Abdomen",
      shortDesc: "Complete evaluation of abdominal organs and pelvis.",
      hero: { tagline: "Complete assessment of abdominal organs.", intro: "Examines most abdominal organs — liver, kidneys, aorta, pancreas, gallbladder, spleen, and bladder. Not indicated exam for evaluating stomach and intestine, which are only partially seen." },
      sections: [
        { kind: "list", title: "What it can detect", items: ["Liver and gallbladder — cirrhosis, steatosis, stones, tumors, and polyps.", "Kidneys — stones, cysts, tumors, hydronephrosis, and congenital malformations.", "Pancreas — pancreatitis, cysts, and tumors.", "Spleen — splenomegaly, tumors, and cysts.", "Aorta — aneurysms and thrombosis.", "Bladder — stones and tumors."] },
        { kind: "paragraph", title: "Importance of diagnosis", body: "Complete abdomen ultrasound is essential for early detection of these pathologies, allowing faster and more effective treatments. Also helps monitor chronic conditions and guides doctor for complementary exams when necessary." },
        { kind: "list", title: "Preparation", items: ["8 hours fasting.", "Last meal evening before between 8 pm and 10 pm: light diet — vegetable soup (except sweet potato and cabbage), fruits, tea with water-and-salt cracker. Avoid soda, milk and derivatives, bread, sweets, and fatty foods.", "Drink 4 glasses of water 2 hours before exam and do not empty bladder until exam is performed.", "Dimethicone or Simethicone — 40 drops or 1 tablet every 6 hours throughout evening before; plus 40 drops or 1 tablet fasting on day of exam."], footer: "Children and afternoon exams have different preparation. Patients using urinary catheter should close it 1 to 2 hours before exam." }
      ]
    },
    es: {
      title: "Abdome Total",
      shortDesc: "Evaluación completa de los órganos abdominales y pelvis.",
      hero: { tagline: "Evaluación completa de los órganos abdominales.", intro: "Examina la mayoría de los órganos del abdomen — hígado, riñones, aorta, páncreas, vesícula biliar, bazo y vejiga. No es el examen indicado para evaluar estómago e intestino, que se ven solo parcialmente." },
      sections: [
        { kind: "list", title: "Lo que puede detectar", items: ["Hígado y vesícula — cirrosis, esteatosis, cálculo, tumores y pólipos.", "Riñones — cálculos, quistes, tumores, hidronefrose y malformaciones congénitas.", "Páncreas — pancreatitis, quistes y tumores.", "Bazo — esplenomegalia, tumores y quistes.", "Aorta — aneurismas y trombosis.", "Vejiga — cálculos y tumores."] },
        { kind: "paragraph", title: "Importancia del diagnóstico", body: "El ultrasonido de abdomen total es esencial para detectar esas patologías de forma precoz, permitiendo tratamientos más rápidos y eficaces. También ayuda a monitorear condiciones crónicas y orienta al médico para exámenes complementarios, cuando sea necesario." },
        { kind: "list", title: "Preparo", items: ["Ayuno de 8 horas.", "Última comida la víspera entre 20h y 22h: dieta leve — sopa de vegetales (excepto batata y repollo), frutas, té con galleta agua-y-sal. Evitar refrescos, leche y derivados, pan, dulces y alimentos grasosos.", "Tomar 4 vasos de agua 2 horas antes del examen y no vaciar la vejiga hasta la realización.", "Dimeticona o Simeticona — 40 gotas o 1 comprimido de 6/6 horas durante toda la víspera; más 40 gotas o 1 comprimido en ayuno el día del examen."], footer: "Niños y exámenes realizados por la tarde tienen preparo diferenciado. Pacientes en uso de sonda vesical deben cerrarla 1 a 2 horas antes del examen." }
      ]
    }
  },
  "abdome-superior": {
    en: {
      title: "Upper Abdomen",
      shortDesc: "Evaluation of liver, gallbladder, pancreas, and spleen.",
      hero: { tagline: "Focus on upper part of abdomen.", intro: "Examines upper part of abdomen — liver, gallbladder, pancreas, and spleen. This exam does not include kidneys, bladder, intestine, and aorta." },
      sections: [
        { kind: "list", title: "What it can detect", items: ["Liver — cirrhosis, hepatic steatosis, and tumors.", "Gallbladder — stones, polyps, and tumors.", "Pancreas — pancreatitis, cysts, and tumors.", "Spleen — splenomegaly, cysts, and tumors."] },
        { kind: "paragraph", title: "Importance of diagnosis", body: "Allows early detection of these pathologies, favoring faster and more effective treatments. Also helps monitor chronic conditions and guide doctor for complementary exams when necessary." },
        { kind: "list", title: "Preparation", items: ["8 hours fasting.", "Last meal evening before between 8 pm and 10 pm: light diet — vegetable soup (except sweet potato), vegetables (except cabbage and cauliflower), fruits, tea with water-and-salt cracker. Avoid soda, carbonated water, juices, milk and derivatives, bread, pasta, egg, sweets, and fatty foods.", "No need to drink water or keep bladder full."] }
      ]
    },
    es: {
      title: "Abdome Superior",
      shortDesc: "Evaluación de hígado, vesícula, páncreas y bazo.",
      hero: { tagline: "Enfoque en la parte superior del abdomen.", intro: "Examina la parte superior del abdomen — hígado, vesícula biliar, páncreas y bazo. No incluyen en este examen riñones, vejiga, intestino y aorta." },
      sections: [
        { kind: "list", title: "Lo que puede detectar", items: ["Hígado — cirrosis, esteatosis hepática y tumores.", "Vesícula biliar — cálculos, pólipos y tumores.", "Páncreas — pancreatitis, quistes y tumores.", "Bazo — esplenomegalia, quistes y tumores."] },
        { kind: "paragraph", title: "Importancia del diagnóstico", body: "Permite detectar esas patologías de forma precoz, favoreciendo tratamientos más rápidos y eficaces. También ayuda a monitorear condiciones crónicas y a orientar al médico para exámenes complementarios cuando sea necesario." },
        { kind: "list", title: "Preparo", items: ["Ayuno de 8 horas.", "Última comida la víspera entre 20h y 22h: dieta leve — sopa de legumes (excepto batata), verduras (excepto repollo y coliflor), frutas, té con galleta agua-y-sal. Evitar refrescos, agua con gas, zumos, leche y derivados, pan, macarrón, huevo, dulces y alimentos grasosos.", "No es necesario tomar agua ni mantener la vejiga llena."] }
      ]
    }
  }
,
  "hipocondrio-direito": {
    en: {
      title: "Right Hypochondrium",
      shortDesc: "Focused evaluation of liver and gallbladder.",
      hero: { tagline: "Focused evaluation of liver and gallbladder.", intro: "Examines only right and upper part of abdomen, comprising liver and gallbladder." },
      sections: [
        { kind: "list", title: "What it can detect", items: ["Cirrhosis and hepatic steatosis.", "Gallstone.", "Tumors and polyps."] },
        { kind: "paragraph", title: "Importance of diagnosis", body: "Usually requested when patient presents gallstone symptoms or experiencing jaundice. Based on it, attending doctor can prioritize which is best treatment — medicinal or surgical." },
        { kind: "list", title: "Preparation", items: ["8 hours fasting.", "Last meal evening before between 8 pm and 10 pm: light diet — vegetable soup (except sweet potato), vegetables (except cabbage and cauliflower), fruits, tea with water-and-salt cracker. Avoid soda, carbonated water, juices, milk and derivatives, bread, pasta, egg, sweets, and fatty foods.", "No need to drink water or keep bladder full."] }
      ]
    },
    es: {
      title: "Hipocôndrio Direito",
      shortDesc: "Evaluación enfocada de hígado y vesícula biliar.",
      hero: { tagline: "Evaluación enfocada del hígado y vesícula.", intro: "Examina solo la parte derecha y superior del abdomen, comprendiendo el hígado y la vesícula biliar." },
      sections: [
        { kind: "list", title: "Lo que puede detectar", items: ["Cirrosis y esteatosis hepática.", "Cálculo (piedra) en la vesícula.", "Tumores y pólipos."] },
        { kind: "paragraph", title: "Importancia del diagnóstico", body: "Normalmente se solicita cuando el paciente presenta síntomas de piedra en la vesícula o está con ictericia. A partir de él, el médico asistente consigue priorizar cuál es el mejor tratamiento — medicamentoso o quirúrgico." },
        { kind: "list", title: "Preparo", items: ["Ayuno de 8 horas.", "Última comida la víspera entre 20h y 22h: dieta leve — sopa de legumes (excepto batata), verduras (excepto repollo y coliflor), frutas, té con galleta agua-y-sal. Evitar refrescos, agua con gas, zumos, leche y derivados, pan, macarrón, huevo, dulces y alimentos grasosos.", "No es necesario tomar agua ni mantener la vejiga llena."] }
      ]
    }
  },
  "rins-vias-urinarias": {
    en: {
      title: "Kidneys and Urinary Tract",
      shortDesc: "Detailed evaluation of kidneys, ureters, and bladder.",
      hero: { tagline: "Complete investigation of urinary tract.", intro: "Examines right and left kidneys, ureters, and bladder. Usually requested when strong suspicion of kidney stones or bleeding identified on urinalysis." },
      sections: [
        { kind: "list", title: "What it can detect", items: ["Stones in kidneys and bladder.", "Cysts and tumors.", "Hydronephrosis.", "Congenital malformations and megaureter."] },
        { kind: "paragraph", title: "Importance of diagnosis", body: "Essential to detect these pathologies and allow faster and more effective treatments. Also helps monitor chronic conditions and guide doctor for complementary exams when necessary." },
        { kind: "list", title: "Preparation", items: ["Drink 4 glasses of water 2 hours before exam.", "Do not empty bladder until exam is performed, unless medical instruction."], footer: "Patients using urinary catheter should close it 1 hour before exam." }
      ]
    },
    es: {
      title: "Riñones y Vías Urinárias",
      shortDesc: "Evaluación detallada de riñones, uréteres y vejiga.",
      hero: { tagline: "Investigación completa del tracto urinario.", intro: "Examina los riñones derecho e izquierdo, los uréteres y la vejiga. Normalmente solicitado ante fuerte sospecha de piedra en los riñones o sangrado identificado en el examen de orina." },
      sections: [
        { kind: "list", title: "Lo que puede detectar", items: ["Cálculos (piedras) en los riñones y en la vejiga.", "Quistes y tumores.", "Hidronefrose.", "Malformaciones congénitas y megauréter."] },
        { kind: "paragraph", title: "Importancia del diagnóstico", body: "Esencial para detectar esas patologías y permitir tratamientos más rápidos y eficaces. También ayuda a monitorear condiciones crónicas y a orientar al médico para exámenes complementarios, cuando sea necesario." },
        { kind: "list", title: "Preparo", items: ["Tomar 4 vasos de agua 2 horas antes del examen.", "No vaciar la vejiga hasta la realización del examen, salvo orientación médica."], footer: "Pacientes en uso de sonda vesical deben cerrarla 1 hora antes del examen." }
      ]
    }
  }
,
  "pelvico-masculino": {
    en: {
      title: "Male Pelvis (Prostate)",
      shortDesc: "Evaluation of bladder and prostate via abdominal approach."
    },
    es: {
      title: "Pélvico Masculino (Próstata)",
      shortDesc: "Evaluación de vejiga y próstata por vía abdominal."
    }
  },
  "mamas-axilas": {
    en: {
      title: "Breast and Axillae",
      shortDesc: "Detailed investigation of breast and axillary chains — complement to mammography or exam of choice in dense breasts and young patients.",
      hero: { tagline: "Detailed investigation of breast and axillary chains", intro: "Breast and axillary ultrasound performed with high-frequency transducer, indicated as complement to mammography or as first-line exam in young patients, dense breasts, pregnant women, and lactating women." },
      sections: [
        { kind: "paragraph", title: "What is it for", body: "Indicated as complement to mammography in investigation of palpable nodules, breast pain, nipple discharge, and situations where mammography has limited sensitivity — such as dense breasts, young patients, pregnant women, and lactating women. Also useful for monitoring cysts, implants, and axillary lymph nodes." },
        { kind: "list", title: "What exam evaluates", items: ["Solid and cystic nodules with BI-RADS classification", "Axillary and supraclavicular lymph node chains", "Mammary ducts and inflammatory processes", "Breast implants — integrity and contour", "Palpable areas and alterations already identified on mammography"] },
        { kind: "paragraph", title: "How it is performed", body: "Patient lies down with arm raised. With warm gel and high-frequency transducer, complete scanning of both breasts and axillae is performed. Exam is completely painless, non-invasive, and radiation-free." },
        { kind: "paragraph", title: "Preparation", body: "No specific preparation necessary. Recommended to avoid using creams, talcum powder, and deodorants on breast and axillae area on day of exam." },
        { kind: "highlight", title: "When to indicate", body: "Can be requested from 25-30 years as initial evaluation, at any age for investigation of palpable alterations, or as guided by attending doctor." }
      ]
    },
    es: {
      title: "Mamas y Axilas",
      shortDesc: "Investigación detallada de la mama y cadeias axilares — complemento de la mamografía o examen de elección en mamas densas y pacientes jóvenes.",
      hero: { tagline: "Investigación detallada de la mama y cadeias axilares", intro: "Ultrasonografía de las mamas y axilas realizada con transductor de alta frecuencia, indicada como complemento de la mamografía o como examen de primera línea en pacientes jóvenes, mamas densas, gestantes y lactantes." },
      sections: [
        { kind: "paragraph", title: "Para qué sirve", body: "Indicado como complemento de la mamografía en la investigación de nódulos palpables, mastalgia, secreción mamilar y en situaciones en que la mamografía tiene sensibilidad limitada — como mamas densas, pacientes jóvenes, gestantes y lactantes. También útil en el acompañamiento de quistes, prótesis y linfonodos axilares." },
        { kind: "list", title: "Lo que el examen evalúa", items: ["Nódulos sólidos y quísticos con clasificación BI-RADS", "Cadeias linfonodales axilares y supraclaviculares", "Ductos mamários y procesos inflamatorios", "Prótesis mamárias — integridad y contorno", "Áreas palpables y alteraciones ya identificadas en mamografía"] },
        { kind: "paragraph", title: "Cómo se realiza", body: "La paciente está deitada, con el brazo elevado. Con gel tibio y transductor de alta frecuencia, se realiza el barrido completo de las dos mamas y de las axilas. El examen es totalmente indoloro, no invasivo y sin radiación." },
        { kind: "paragraph", title: "Preparo", body: "No es necesario preparo específico. Se recomienda evitar el uso de cremas, talcos y desodorantes en la región de las mamas y axilas en el día del examen." },
        { kind: "highlight", title: "Cuándo indicar", body: "Puede solicitarse a partir de los 25–30 años como evaluación inicial, en cualquier edad para investigación de alteraciones palpables, o conforme orientación del médico asistente." }
      ]
    }
  },
  "pelvico-infantil": {
    en: {
      title: "Pediatric Pelvic",
      shortDesc: "Gentle evaluation of uterus and ovaries and investigation of precocious puberty in girls.",
      hero: { tagline: "Pediatric pelvic assessment with care", intro: "Pediatric pelvic ultrasound is performed via abdominal approach, completely non-invasive, to evaluate uterus and ovaries in girls and investigate signs of precocious puberty." },
      sections: [
        { kind: "paragraph", title: "What is it for", body: "Indicated to evaluate anatomy and development of uterus and ovaries in girls, clarify complaints such as pelvic pain, early vaginal bleeding or alterations in pubertal development, and assist in diagnosis and monitoring of precocious puberty." },
        { kind: "list", title: "What exam evaluates", items: ["Size, shape, and volume of uterus", "Thickness and pattern of endometrium", "Ovarian volume and presence of follicles", "Ultrasound signs compatible with precocious puberty", "Cysts, malformations, and other pelvic alterations"] },
        { kind: "paragraph", title: "How it is performed", body: "Exam is performed exclusively via abdominal route — without any internal contact — with full bladder, which functions as natural acoustic window to visualize pelvic organs. Patient remains lying down and accompanied by caregiver throughout exam." },
        { kind: "paragraph", title: "Preparation", body: "Necessary to have full bladder. Guidance: ingest 4 glasses of water 1 hour before exam and do not urinate until its completion. For younger children, adjust volume according to age." },
        { kind: "highlight", title: "Humanized care", body: "All care is designed for child's and family's comfort: welcoming language, respectful pace, and caregiver's presence throughout exam." }
      ]
    },
    es: {
      title: "Pélvico Infantil",
      shortDesc: "Evaluación delicada de útero y ovários e investigación de pubertad precoz en niñas.",
      hero: { tagline: "Evaluación pélvica pediátrica con acolhimiento", intro: "El ultrasonido pélvico infantil se realiza por vía abdominal, de forma totalmente no invasiva, para evaluar útero y ovários en niñas e investigar signos de pubertad precoz." },
      sections: [
        { kind: "paragraph", title: "Para qué sirve", body: "Indicado para evaluar la anatomía y el desarrollo del útero y de los ovários en niñas, esclarecer quejas como dolor pélvico, sangrado vaginal precoz o alteraciones en el desarrollo puberal, y auxiliar en el diagnóstico y acompañamiento de la pubertad precoz." },
        { kind: "list", title: "Lo que el examen evalúa", items: ["Tamaño, formato y volumen del útero", "Espesor y padrón del endométrio", "Volumen ovárico y presencia de folículos", "Signos ultrassonográficos compatibles con pubertad precoz", "Quistes, malformaciones y otras alteraciones pélvicas"] },
        { kind: "paragraph", title: "Cómo se realiza", body: "El examen se realiza exclusivamente por vía abdominal — sin cualquier contacto interno — con la vejiga llena, que funciona como una ventana acústica natural para visualizar los órganos pélvicos. La paciente permanece deitada y acompañada por un responsable durante todo el examen." },
        { kind: "paragraph", title: "Preparo", body: "Es necesario estar con la vejiga llena. Orientación: ingerir 4 vasos de agua 1 hora antes del examen y no urinar hasta la su realización. Para niños más pequeños, ajustamos el volumen conforme la edad." },
        { kind: "highlight", title: "Cuidado humanizado", body: "Todo el atendimiento está pensado para el conforto de la criança y de la familia: lenguaje acolhedor, ritmo respetuoso y la presencia del responsable durante todo el examen." }
      ]
    }
  }
,
  "partes-moles": {
    en: {
      title: "Soft Tissues",
      shortDesc: "Ultrasound evaluation of superficial tissues (skin, subcutaneous, muscles), useful for characterizing nodules, cysts, lipomas, and inflammatory processes."
    },
    es: {
      title: "Partes Moles",
      shortDesc: "Evaluación ultrassonográfica de tejidos superficiales (piel, subcutáneo, músculos), útil para caracterizar nódulos, quistes, lipomas y procesos inflamatorios."
    }
  },
  "duplex-scan-mmii": {
    en: {
      title: "Duplex Scan of Lower Limbs",
      shortDesc: "Color Doppler of arteries and veins of lower limbs — varices, thrombosis, and arterial disease.",
      hero: { tagline: "Color Doppler of arteries and veins of lower limbs", intro: "Non-invasive exam that combines ultrasound and color Doppler to evaluate in real time blood flow in arteries and veins of legs. Fundamental in diagnosis of varices, venous insufficiency, deep venous thrombosis, and peripheral arterial disease." },
      sections: [
        { kind: "paragraph", title: "What is it for", body: "Indicated in investigation of varices and chronic venous insufficiency, suspicion of deep venous thrombosis (DVT), leg pain and swelling, claudication, peripheral arterial disease, and planning and follow-up of vascular surgeries." },
        { kind: "list", title: "What exam evaluates", items: ["Superficial and deep venous system", "Venous reflux and insufficient valves", "Presence of acute or chronic thrombi", "Arterial flow, plaques, and stenoses", "Pre and postoperative mapping"] },
        { kind: "paragraph", title: "How it is performed", body: "Venous assessment is done with patient standing (with provocative maneuvers to detect reflux) and lying down. Arterial assessment is done lying down, with color Doppler and spectral analyzing flow at different limb points." },
        { kind: "paragraph", title: "Preparation", body: "No specific preparation necessary. Recommended to wear comfortable clothes that allow legs to be exposed easily." },
        { kind: "highlight", title: "Differential", body: "Painless exam, non-invasive, without radiation and without contrast, with detailed report delivered on the spot." }
      ]
    },
    es: {
      title: "Duplex Scan de Miembros Inferiores",
      shortDesc: "Doppler colorido de las arterias y veinas de los miembros inferiores — varices, trombosis y enfermedad arterial.",
      hero: { tagline: "Doppler colorido de las arterias y veinas de los miembros inferiores", intro: "Examen no invasivo que combina ultrasonografía y Doppler colorido para evaluar en tiempo real el flujo sanguíneo en las arterias y veinas de las piernas. Fundamental en el diagnóstico de varices, insuficiencia venosa, trombosis venosa profunda y enfermedad arterial periférica." },
      sections: [
        { kind: "paragraph", title: "Para qué sirve", body: "Indicado en la investigación de varices e insuficiencia venosa crónica, sospecha de trombosis venosa profunda (TVP), dolor e hinchazón en las piernas, claudicación, enfermedad arterial periférica, y en la planificación y seguimiento de cirugías vasculares." },
        { kind: "list", title: "Lo que el examen evalúa", items: ["Sistema venoso superficial y profundo", "Reflujo venoso y válvulas insuficientes", "Presencia de trombos agudos o crónicos", "Flujo arterial, placas y estenoses", "Mapeo preoperatorio y posoperatorio"] },
        { kind: "paragraph", title: "Cómo se realiza", body: "La evaluación venosa se hace con la paciente de pie (con maniobras provocativas para detectar reflujo) y deitada. La evaluación arterial se hace deitada, con Doppler colorido y espectral analizando el flujo en diferentes puntos del miembro." },
        { kind: "paragraph", title: "Preparo", body: "No es necesario preparo específico. Se recomienda vestir ropa cómoda que permita exponer las piernas con facilidad." },
        { kind: "highlight", title: "Diferencial", body: "Examen indoloro, no invasivo, sin radiación y sin contraste, con laudo detallado entregado en la hora." }
      ]
    }
  }
,
  "carotidas-vertebrais": {
    en: {
      title: "Carotids and Vertebrals",
      shortDesc: "Doppler of neck arteries for cerebrovascular screening."
    },
    es: {
      title: "Carótidas y Vertebrales",
      shortDesc: "Doppler de las arterias del cuello para rastreio cerebrovascular."
    }
  },
  "aorta-iliacas": {
    en: {
      title: "Aorta and Iliacs",
      shortDesc: "Investigation of aneurysms and abdominal arterial disease."
    },
    es: {
      title: "Aorta e Ilíacas",
      shortDesc: "Investigación de aneurismas y enfermedad arterial abdominal."
    }
  },
  "tireoide-doppler": {
    en: {
      title: "Thyroid with Doppler",
      shortDesc: "Evaluation of thyroid gland with flow mapping."
    },
    es: {
      title: "Tireoide con Doppler",
      shortDesc: "Evaluación de la glándula tireoide con mapeamiento de flujo."
    }
  },
  "cervical-doppler": {
    en: {
      title: "Cervical with Doppler",
      shortDesc: "Complete evaluation of cervical structures and lymph nodes."
    },
    es: {
      title: "Cervical con Doppler",
      shortDesc: "Evaluación completa de las estructuras cervicales y linfonodos."
    }
  },
  "glandulas-salivares": {
    en: {
      title: "Salivary Glands",
      shortDesc: "Evaluation of parotid, submandibular, and sublingual glands."
    },
    es: {
      title: "Glándulas Salivares",
      shortDesc: "Evaluación de parótidas, submandibulares y sublinguales."
    }
  },
  "abdominal-total-pediatrico": {
    en: {
      title: "Complete Abdomen (Pediatric)",
      shortDesc: "Complete abdominal ultrasound adapted for children."
    },
    es: {
      title: "Abdominal Total (Pediátrico)",
      shortDesc: "Ultrasonido abdominal completo adaptado para niños."
    }
  },
  "rins-vias-urinarias-pediatrico": {
    en: {
      title: "Kidneys and Urinary Tract (Pediatric)",
      shortDesc: "Evaluation of kidneys and bladder in babies and children."
    },
    es: {
      title: "Riñones y Vías Urinárias (Pediátrico)",
      shortDesc: "Evaluación de los riñones y vejiga en bebés y niños."
    }
  },
  "transfontanela": {
    en: {
      title: "Transfontanelle",
      shortDesc: "Evaluation of baby's brain through the still-open fontanelle."
    },
    es: {
      title: "Transfontanela",
      shortDesc: "Evaluación del cerebro del bebé a través de la fontanela aún abierta."
    }
  }
,
};
