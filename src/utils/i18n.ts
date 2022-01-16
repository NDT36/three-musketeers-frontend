import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TRANSLATIONS_EN } from 'translations/en';
import { TRANSLATIONS_VI } from 'translations/vi';

i18next.use(initReactI18next).init({
  fallbackLng: 'vi',
  debug: false,
  supportedLngs: ['en', 'vi'],
  interpolation: {
    escapeValue: false,
  },
  resources: { vi: { translation: TRANSLATIONS_VI }, en: { translation: TRANSLATIONS_EN } },
});

// export const setResourceI18n = async () => {
//   try {
//     const { data } = await getListLanguageByEnvironment();

//     const listLanguage = Object.keys(data);

//     listLanguage.forEach((language: any) => {
//       i18n.addResourceBundle(language, 'translation', data[language], true, true);
//     });
//   } catch (error) {
//     handleErrorMessage(error);
//   }
// };
export default i18next;
