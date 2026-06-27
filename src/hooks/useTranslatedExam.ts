import { useLanguage } from '@/contexts/LanguageContext';
import { Exam } from '@/data/exams';
import { getTranslatedExamField } from '@/data/exams.translations';

export function useTranslatedExam(exam: Exam): Exam {
  const { lang } = useLanguage();

  if (lang === 'pt') return exam;

  const f = <T>(field: string, fallback: T): T =>
    getTranslatedExamField(exam.slug, field, lang, fallback);

  const translatedExam: Exam = {
    ...exam,
    title: f('title', exam.title),
    shortDesc: f('shortDesc', exam.shortDesc),
    longDesc: f('longDesc', exam.longDesc),
    preparation: f('preparation', exam.preparation),
    duration: f('duration', exam.duration),
    whatToBring: f('whatToBring', exam.whatToBring),
    indications: f('indications', exam.indications),
  };

  const translatedHero = f('hero', null);
  translatedExam.hero = translatedHero || exam.hero;

  const translatedSections = f('sections', null);
  translatedExam.sections = translatedSections || exam.sections;

  const translatedGallery = f('gallery', null);
  translatedExam.gallery = translatedGallery || exam.gallery;

  const translatedFaq = f('faq', null);
  translatedExam.faq = translatedFaq || exam.faq;

  return translatedExam;
}
