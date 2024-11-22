import { useEffect, useState } from "react";
import { DietIcon } from "../icons/DietIcon";
import { DietSelector } from "../utils/DietSelector";
import { Diet } from "../../types";
import { FlagState, PizzaFlag } from "../utils/PizzaFlag";
import { Button } from "../utils/Button";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Check,
  Info,
  Minus,
  Pencil,
  Plus,
  Trash2,
  Undo2,
} from "lucide-react";

import priceIcon from "../../assets/Cash.png";
import sliceIcon from "../../assets/Pizza.png";
import title from "../../assets/Title.png";
import { Trans, useTranslation } from "react-i18next";

const flagStates: FlagState[] = [
  "perfect",
  "good",
  "okay",
  "bad",
  "cantEat",
  "N/A",
];

const flagStatesDescriptions = [
  "info-result-flag1",
  "info-result-flag2",
  "info-result-flag3",
  "info-result-flag4",
  "info-result-flag5",
  "info-result-flag6",
];

const components = {
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
      >
        <Plus size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  addButton: (
    <span className="inline-block translate-y-1">
      <Button color="green" onClick={() => {}} className="w-16 rounded-lg">
        <Plus size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  editButton: (
    <span className="inline-block translate-y-1">
      <Button color="green" onClick={() => {}} className="w-8 rounded-lg">
        <Pencil size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  validateButton: (
    <span className="inline-block translate-y-1">
      <Button color="green" onClick={() => {}} className="w-8 rounded-lg">
        <Check size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  cancelButton: (
    <span className="inline-block translate-y-1">
      <Button color="yellow" onClick={() => {}} className="w-8 rounded-lg">
        <Undo2 size={20} strokeWidth={2} />
      </Button>
    </span>
  ),
  deleteButton: (
    <span className="inline-block translate-y-1">
      <Button color="red" onClick={() => {}} className="w-8 rounded-lg">
        <Trash2 size={20} strokeWidth={2} />
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
    <Info size={20} strokeWidth={2} color="gray" className="inline-block" />
  ),
};

export function InfoContent() {
  const { t } = useTranslation();
  const [diet, setDiet] = useState<Diet>("pescoVegetarian");
  const [flagStateIndex, setFlagStateIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setFlagStateIndex((flagStateIndex + 1) % 6),
      5000
    );
    return () => {
      clearInterval(intervalId);
    };
  }, [flagStateIndex]);
  return (
    <div className="h-[80vh] overflow-y-scroll">
      {/* ########## Introduction ########## */}
      <div className="flex text-2xl items-baseline justify-center mb-4">
        <Trans i18nKey="info-title" components={components} />
      </div>
      <div className="w-[750px] text-left">
        <p className="mb-2">{t("info-intro-p1")}</p>
        <p>{t("info-intro-p2")}</p>
        <p className="mb-2">
          <Trans i18nKey="info-intro-p3" components={components} />
        </p>
        <p className="mb-2">
          <Trans i18nKey="info-intro-p4" components={components} />
        </p>
        <p className="mb-6">
          <Trans i18nKey="info-intro-p5" components={components} />
        </p>

        {/* ########## Theorem ########## */}

        <p className="mb-2">{t("info-theorem-p1")}</p>
        <p className="text-xl bg-amber-300 w-fit rounded-md px-2 font-bold mb-2">
          {t("info-theorem-title")}
        </p>
        <p>
          <Trans i18nKey="info-theorem-p2" components={components} />
        </p>
        <p className="mb-2">{t("info-theorem-p3")}</p>
        <p className="mb-5">
          <Trans i18nKey="info-theorem-p4" components={components} />
        </p>

        {/* ########## How to use ########## */}

        <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
          {t("info-how-title")}
        </p>
        <p className="mb-2">{t("info-how-p1")}</p>
        <ul className="list-disc list-inside mb-2">
          <li>
            <Trans i18nKey="info-how-l1" components={components} />
          </li>
          <li>
            <Trans i18nKey="info-how-l2" components={components} />
          </li>
          <li>
            <Trans i18nKey="info-how-l3" components={components} />
          </li>
        </ul>
        <p className="mb-5">{t("info-how-p2")}</p>

        {/* ########## The People Panel ########## */}

        <div className="mb-5">
          <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
            {t("info-people-title")}
          </p>
          <p className="mb-2">{t("info-people-p1")}</p>
          <p>
            <Trans i18nKey="info-people-l1" components={components} />
          </p>
          <p>
            <Trans i18nKey="info-people-l2" components={components} />
          </p>
          <p>
            <Trans i18nKey="info-people-l3" components={components} />
          </p>
          <p>
            <Trans i18nKey="info-people-l4" components={components} />
          </p>
          <p className="mb-2">
            <Trans i18nKey="info-people-p2" components={components} />
          </p>

          <p>{t("info-people-p3")}</p>
        </div>

        {/* ########## The Pizza Panel ########## */}

        <div className="mb-5">
          <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
            {t("info-pizza-title")}
          </p>
          <p className="mb-2">{t("info-pizza-p1")}</p>
          <p className="mb-4">{t("info-pizza-p2")}</p>
          <p className="mb-2">{t("info-pizza-p3")}</p>
          <div className="w-40 mb-2">
            <DietSelector tabIndex={0} value={diet} onChange={setDiet} />
          </div>
          <p className="mb-2">
            <Trans i18nKey="info-pizza-p4" components={components} />
          </p>
          <p>
            <Trans i18nKey="info-pizza-l1" components={components} />
          </p>
          <p>
            <Trans i18nKey="info-pizza-l2" components={components} />
          </p>
          <p>
            <Trans i18nKey="info-pizza-l3" components={components} />
          </p>
          <p className="mb-4">
            <Trans i18nKey="info-pizza-l4" components={components} />
          </p>
          <p>
            <Trans i18nKey="info-pizza-p5" components={components} />
          </p>
          <p className="mb-4">
            <Trans i18nKey="info-pizza-p6" components={components} />
          </p>
          <p>
            <Trans i18nKey="info-pizza-p7" components={components} />
          </p>
          <p className="mb-4">
            <Trans i18nKey="info-pizza-p8" components={components} />
          </p>
          <p className="mb-4">
            <Trans i18nKey="info-pizza-p9" components={components} />
          </p>
          <p>{t("info-pizza-p10")}</p>
        </div>

        {/* ########## The Result Panel ########## */}

        <div className="mb-5">
          <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
            {t("info-result-title")}
          </p>
          <p className="mb-2">{t("info-result-p1")}</p>
          <p className="mb-2">{t("info-result-p2")}</p>
          <div className="w-64 flex mb-2">
            <div className="text-3xl font-bold mr-2 w-full">
              <div className="mb-2 flex justify-center">
                <img src={priceIcon} className="size-8" alt="Price" />
              </div>
              <div className="bg-lime-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
                <span className="text-lg">
                  4 € / {t("info-display-person")}
                </span>
                <span className="text-lg">12 € {t("info-display-total")}</span>
              </div>
            </div>
            <div className="text-3xl font-bold w-full">
              <div className="mb-2 flex justify-center">
                <img src={sliceIcon} className="size-8" alt="Quantity" />
              </div>
              <div className="bg-amber-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
                <span className="text-lg">4 {t("info-display-slices")}</span>
                <span className="text-lg">~1/2 {t("info-display-pizzas")}</span>
              </div>
            </div>
          </div>
          <p>{t("info-result-p3")}</p>

          <hr className="my-2 border-black w-[90%] mx-[5%]" />

          <p className="mb-2">{t("info-result-p4")}</p>
          <div className="flex items-center w-[500px]">
            <div className="h-full mr-2 text-center min-w-32 mb-4">
              <div className="text-3xl font-bold mb-2 flex justify-center">
                <DietIcon
                  type={"vegetarian"}
                  color="Color"
                  className="size-8"
                />
              </div>
              <PizzaFlag flagState={flagStates[flagStateIndex]} />
            </div>
            <p className="translate-y-3">
              {t(flagStatesDescriptions[flagStateIndex])}
            </p>
          </div>
          <p className="mb-2">
            <Trans i18nKey="info-result-p5" components={components} />
          </p>

          <p>{t("info-result-p6")}</p>
          <ul className="list-disc list-inside mb-2">
            <li>
              <Trans i18nKey="info-result-p7" components={components} />
            </li>
            <li>{t("info-result-p8")}</li>
          </ul>
        </div>

        {/* ########## Thanks ########## */}

        <div className="mb-5">
          <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
            {t("info-thanks-title")}
          </p>
          <p>{t("info-thanks-p1")}</p>
        </div>
        <p className="text-gray-600 text-center w-full">{t("info-footer")}</p>
      </div>
    </div>
  );
}
