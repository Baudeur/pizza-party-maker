import { useTranslation } from "react-i18next";
import spinner from "../../assets/LoadingOmni.png";

export function Spinner() {
  const { t } = useTranslation();
  return (
    <div className="flex w-full justify-center">
      <img
        src={spinner}
        className="size-8 animate-spin"
        alt={t("alt-loading-spinner")}
      />
    </div>
  );
}
