import { useLanguage } from '@/contexts/LanguageContext';
import { Exam } from '@/data/exams';
import { getTranslatedExamField } from '@/data/exams.translations';

export function useTranslatedExam(exam: Exam): Exam {
  const { lang } = useLanguage();

  if (lang === 'pt') return exam;

  // Translate main fields
  const translatedExam: Exam = {
    ...exam,
    title: getTranslatedExamField(exam.slug, 'title', lang, exam.title),
    shortDesc: getTranslatedExamField(exam.slug, 'shortDesc', lang, exam.shortDesc),
    longDesc: getTranslatedExamField(exam.slug, 'longDesc', lang, exam.longDesc),
  };

  // Translate hero section
  if (exam.hero) {
    const translatedHero = getTranslatedExamField(exam.slug, 'hero', lang, null);
    translatedExam.hero = translatedHero || exam.hero;
  }

  // Translate sections
  if (exam.sections) {
    const translatedSections = getTranslatedExamField(exam.slug, 'sections', lang, null);
    translatedExam.sections = translatedSections || exam.sections;
  }

  // Translate gallery captions
  if (exam.gallery) {
    const translatedGallery = getTranslatedExamField(exam.slug, 'gallery', lang, null);
    translatedExam.gallery = translatedGallery || exam.gallery;
  }

  // Translate FAQ
  if (exam.faq) {
    const translatedFaq = getTranslatedExamField(exam.slug, 'faq', lang, null);
    translatedExam.faq = translatedFaq || exam.faq;
  }

  return translatedExam;
}
