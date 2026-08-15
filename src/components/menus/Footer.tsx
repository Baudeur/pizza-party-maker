import { useTranslation } from "react-i18next";
import { Desktop, Mobile } from "../utils/ReactiveComponents";

export function Footer() {
  const { t } = useTranslation();
  const version = __APP_VERSION__;
  return (
    <div className="flex flex-col w-full h-10 items-center justify-center text-gray-500 mb-2">
      <Mobile>
        <span>{t("created-by")} Bertrand Baudeur</span>
        <span>
          pizza-party-maker v{version} -{" "}
          <a
            href="https://github.com/Baudeur/pizza-party-maker"
            className="text-gray-500 underline hover:text-gray-600"
          >
            Github
          </a>
        </span>
      </Mobile>
      <Desktop>
        <span>
          {t("created-by")} Bertrand Baudeur - pizza-party-maker v{version} -{" "}
          <a
            href="https://github.com/Baudeur/pizza-party-maker"
            className="text-gray-500 underline hover:text-gray-600"
          >
            Github
          </a>
        </span>
      </Desktop>
    </div>
  );
}
