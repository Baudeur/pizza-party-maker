import { useTranslation } from "react-i18next";
import { DropDown } from "../utils/DropDown";
//{language === "en" ? "" : "🇫🇷"}
export function LanguageSelector() {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  return (
    <DropDown
      onChange={(value) => {
        changeLanguage(value);
      }}
      options={[
        {
          label: "English",
          value: "en",
          disabled: language === "en",
          icon: <div className="text-3xl">🇬🇧</div>,
        },
        {
          label: "Français",
          value: "fr",
          disabled: language === "fr",
          icon: <div className="text-3xl">🇫🇷</div>,
        },
      ]}
      value={language}
      minimal={true}
    />
  );
}
