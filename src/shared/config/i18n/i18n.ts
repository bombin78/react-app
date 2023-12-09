import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: 'ru',
        fallbackLng: 'ru',
        // Отключаем вывод информации в консоль
        // debug: __IS_DEV__,
        debug: false,

        interpolation: {
            escapeValue: false,
        },
        backend: {
            addPath: '/locales/add/{{lng}}/{{ns}}',
        },
    });

export default i18n;
