import { HelpCircle, Pencil, Plus, Scale } from "lucide-react";
import { Button } from "./Button";
import title from "../../assets/Title.png";
import { Trans, useTranslation } from "react-i18next";
import { TFunction } from "i18next";

const components = (t: TFunction<"translation", undefined>) => ({
  pink: <strong className="text-pink-600" />,
  green: <strong className="text-green-600" />,
  blue: <strong className="text-blue-600" />,
  orange: <strong className="text-orange-600" />,
  red: <strong className="text-red-600" />,
  bold: <b />,
  title: (
    <span className="inline-block">
      <img
        src={title}
        className="h-6 mx-2 translate-y-[5px]"
        alt="Pizza Party Maker"
      />
    </span>
  ),
  infoIcon: (
    <HelpCircle
      size={20}
      strokeWidth={2}
      color="black"
      className="inline-block"
    />
  ),
  computeButton: (
    <span className="inline-block">
      <Button
        className="px-2 rounded-lg text-xl"
        color="green"
        onClick={() => {}}
        title={t("light-compute-label")}
      >
        {t("light-compute-label")}
      </Button>
    </span>
  ),
  moreButton: (
    <span className="inline-block translate-y-1">
      <Button
        onClick={() => {}}
        color="green"
        title={t("light-less-fair-title", {
          interpolation: { escapeValue: false },
          pizza: t("light-vegetarian-pizza-quantity", { count: 2 }),
        })}
        className="px-2 rounded-lg text-black flex items-center gap-1 text-xl"
      >
        <Plus size={20} />
        {t("more")}
      </Button>
    </span>
  ),
  modifyButton: (
    <span className="inline-block translate-y-1">
      <Button
        onClick={() => {}}
        color="green"
        title={t("light-edit-button")}
        className="rounded-lg px-2 gap-2 text-xl mb-1"
      >
        <Pencil size={20} />
        {t("light-edit-button")}
      </Button>
    </span>
  ),
  modifyButtonShort: (
    <span className="inline-block translate-y-1">
      <Button
        onClick={() => {}}
        color="green"
        title={t("light-edit-button")}
        className="rounded-lg px-2 gap-2 text-xl mb-1"
      >
        <Pencil size={20} />
        {t("light-edit-button-short")}
      </Button>
    </span>
  ),
  moreFairButton: (
    <span className="inline-block translate-y-1">
      <Button
        onClick={() => {}}
        color="green"
        title={t("light-more-fair-button")}
        className="px-2 rounded-lg flex items-center gap-1 text-xl"
      >
        <Scale size={20} />
        {t("light-more-fair-button")}
      </Button>
    </span>
  ),
});

export function CompTrans({ i18nKey }: { i18nKey: string }) {
  const { t } = useTranslation();
  return <Trans i18nKey={i18nKey} components={components(t)} />;
}
