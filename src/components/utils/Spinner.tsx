import { useTranslation } from "react-i18next";
import spinner from "../../assets/LoadingOmni.png";

type SpinnerProps = {
  size?: number;
};

export function Spinner({ size = 8 }: SpinnerProps) {
  const { t } = useTranslation();
  return (
    <div className="flex w-full justify-center">
      <img
        src={spinner}
        className="animate-spin"
        style={{
          width: `${size / 4}rem`,
          height: `${size / 4}rem`,
        }}
        alt={t("alt-loading-spinner")}
      />
    </div>
  );
}
