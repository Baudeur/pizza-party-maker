import { useTranslation } from "react-i18next";
import { DropDown } from "../utils/DropDown";
//{language === "en" ? "" : "🇫🇷"}
export function LanguageSelector() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  return (
    <DropDown
      onChange={(value) => {
        changeLanguage(value);
      }}
      options={[
        {
          title: "Switch to English",
          label: "English",
          value: "en",
          disabled: language === "en",
          icon: <div className="text-3xl">🇬🇧</div>,
        },
        {
          title: "Choisir le français",
          label: "Français",
          value: "fr",
          disabled: language === "fr",
          icon: <div className="text-3xl">🇫🇷</div>,
        },
      ]}
      value={language}
      minimal={true}
      title={t("language-selection")}
    />
  );
}
