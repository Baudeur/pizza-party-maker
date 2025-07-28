import {
  ArrowBigLeft,
  ArrowBigRight,
  Check,
  HelpCircle,
  Minus,
  Pencil,
  Plus,
  Scale,
  Settings,
  Store,
  Trash2,
  Undo2,
} from "lucide-react";
import { DietIcon } from "../icons/DietIcon";
import { Button } from "./Button";
import { SaveAsIcon } from "../icons/SaveAsIcon";
import title from "../../assets/Title.png";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { Desktop } from "./ReactiveComponents";

const components = (
  t: TFunction<"translation", undefined>,
  isDesktop: boolean
) => ({
  pink: <strong className="text-pink-600" />,
  green: <strong className="text-green-600" />,
  sky: <strong className="text-sky-600" />,
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
  normalIcon: (
    <span className="inline-block translate-y-1">
      <DietIcon type="normal" color="Color" className="size-6 mx-1" />
    </span>
  ),
  pescoVegetarianIcon: (
    <span className="inline-block translate-y-1">
      <DietIcon type="pescoVegetarian" color="Color" className="size-6 mx-1" />
    </span>
  ),
  vegetarianIcon: (
    <span className="inline-block translate-y-1">
      <DietIcon type="vegetarian" color="Color" className="size-6 mx-1" />
    </span>
  ),
  veganIcon: (
    <span className="inline-block translate-y-1">
      <DietIcon type="vegan" color="Color" className="size-6 mx-1" />
    </span>
  ),
  minusButton: (
    <span className="inline-block translate-y-1">
      <Button
        className="inline-flex w-7 rounded-s-lg"
        color="red"
        onClick={() => {}}
        title={t("minus")}
      >
        <Minus size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  plusButton: (
    <span className="inline-block translate-y-1">
      <Button
        className="inline-flex w-7 rounded-e-lg"
        color="green"
        onClick={() => {}}
        title={t("plus")}
      >
        <Plus size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  addButton: (
    <span className="inline-block translate-y-1">
      <Button
        color="green"
        onClick={() => {}}
        className="w-16 rounded-lg"
        title={t("plus")}
      >
        <Plus size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  editButton: (
    <span className="inline-block translate-y-1">
      <Button
        color="green"
        onClick={() => {}}
        className="w-8 rounded-lg"
        title={t("edit-pizza", { pizza: "pizza" })}
      >
        <Pencil size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  validateButton: (
    <span className="inline-block translate-y-1">
      <Button
        color="green"
        onClick={() => {}}
        className="w-8 rounded-lg"
        title={t("apply-changes", { pizza: "pizza" })}
      >
        <Check size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  cancelButton: (
    <span className="inline-block translate-y-1">
      <Button
        color="orange"
        onClick={() => {}}
        className="w-8 rounded-lg"
        title={t("cancel-changes", { pizza: "pizza" })}
      >
        <Undo2 size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  deleteButton: (
    <span className="inline-block translate-y-1">
      <Button
        color="red"
        onClick={() => {}}
        className="w-8 rounded-lg"
        title={t("delete-pizza", { pizza: "pizza" })}
      >
        <Trash2 size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  saveButton: (
    <span className="inline-block translate-y-1">
      <Button
        color="yellow"
        onClick={() => {}}
        className={`rounded-lg px-2`}
        title={t("save-as-pizzeria")}
      >
        <span className="flex items-center gap-2">
          <SaveAsIcon
            size={20}
            strokeWidth={2}
            backgroundColor="bg-amber-300"
          />
          {isDesktop ? (
            <span>{t("save-as-pizzeria")}</span>
          ) : (
            <span>{t("save")}</span>
          )}
        </span>
      </Button>
    </span>
  ),
  saveAsButton: (
    <span className="inline-block translate-y-1">
      <Button
        color="green"
        onClick={() => {}}
        className="w-16 rounded-lg"
        title={t("save-as-pizzeria")}
      >
        <SaveAsIcon size={20} strokeWidth={2} backgroundColor="bg-green-500" />
      </Button>
    </span>
  ),
  pizzeriasButton: (
    <span className="inline-block translate-y-1">
      <Button
        color="yellow"
        onClick={() => {}}
        className={`rounded-lg px-2`}
        title={t("manage-pizzeria-title")}
      >
        <span className="flex items-center gap-2">
          <Store size={20} strokeWidth={2} />
          <Desktop>
            <span>{t("manage-pizzeria-button")}</span>
          </Desktop>
        </span>
      </Button>
    </span>
  ),
  leftArrowKey: (
    <span className="inline-block size-7 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)] translate-y-1">
      <span className="flex items-center justify-center size-full">
        <ArrowBigLeft size={18} />
      </span>
    </span>
  ),
  rightArrowKey: (
    <span className="inline-block size-7 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)] translate-y-1">
      <span className="flex items-center justify-center size-full">
        <ArrowBigRight size={18} />
      </span>
    </span>
  ),
  tabKey: (
    <span className="inline-block h-7 w-10 px-1 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)]">
      <span className="flex items-center justify-center size-full">Tab</span>
    </span>
  ),
  enterKey: (
    <span className="inline-block h-7 w-14 px-1 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)]">
      <span className="flex items-center justify-center size-full">Enter</span>
    </span>
  ),
  escapeKey: (
    <span className="inline-block h-7 w-20 px-1 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)]">
      <span className="flex items-center justify-center size-full">Escape</span>
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
  parametersIcon: (
    <Settings size={20} strokeWidth={2} color="gray" className="inline-block" />
  ),
  linkToDetailsHelp: <Link to={"/help-details"} />,
  suggesterButton: (
    <span className="inline-block">
      <Button
        color="green"
        onClick={() => {}}
        className="font-bold rounded-lg px-2"
        title={t("suggester-open-button")}
      >
        {t("suggester-open-button")}
      </Button>
    </span>
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
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const { t } = useTranslation();
  return <Trans i18nKey={i18nKey} components={components(t, isDesktop)} />;
}
