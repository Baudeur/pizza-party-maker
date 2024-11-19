import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locales/en.json";
import frJSON from "./locales/fr.json";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { ...enJSON },
      fr: { ...frJSON },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
  });
