import { useEffect, useState } from "react";
import { DietSelector } from "../utils/DietSelector";
import { Diet } from "../../types";
import { FlagState, PizzaFlag } from "../utils/PizzaFlag";

import priceIcon from "../../assets/Cash.png";
import sliceIcon from "../../assets/Pizza.png";
import { useTranslation } from "react-i18next";
import { CompTrans } from "../utils/TranslationComponents";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { EitherDesktopOrMobile, Mobile } from "../utils/ReactiveComponents";

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

export function InfoContent() {
  const { t } = useTranslation();
  const [diet, setDiet] = useState<Diet>("pescoVegetarian");
  const [flagStateIndex, setFlagStateIndex] = useState(0);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  useEffect(() => {
    const intervalId = setInterval(
      () => setFlagStateIndex((prevState) => (prevState + 1) % 6),
      5000
    );
    return () => {
      clearInterval(intervalId);
    };
  }, [flagStateIndex]);
  return (
    <div className={`${!isDesktop && "h-full"}`}>
      <Mobile>
        <p className="text-xl bg-amber-300 rounded-lg px-2 font-bold mb-4 text-center w-full">
          {t("help")}
        </p>
      </Mobile>
      {/* ########## Introduction ########## */}
      <div
        className={`flex text-2xl items-baseline justify-center mb-4 ${
          !isDesktop && "my-4"
        }`}
      >
        <CompTrans i18nKey="info-title" />
      </div>
      <div className={`${isDesktop && "max-w-[750px]"} text-left`}>
        <p className="mb-2">{t("info-intro-p1")}</p>
        <p>{t("info-intro-p2")}</p>
        <p className="mb-2">
          <CompTrans i18nKey="info-intro-p3" />
        </p>
        <p className="mb-2">
          <CompTrans i18nKey="info-intro-p4" />
        </p>
        <p className="mb-6">
          <CompTrans i18nKey="info-intro-p5" />
        </p>

        {/* ########## Theorem ########## */}

        <p className="mb-2">{t("info-theorem-p1")}</p>
        <p className="text-xl bg-amber-300 w-fit rounded-md px-2 font-bold mb-2">
          {t("info-theorem-title")}
        </p>
        <p>
          <CompTrans i18nKey="info-theorem-p2" />
        </p>
        <p className="mb-2">{t("info-theorem-p3")}</p>
        <p className="mb-5">
          <CompTrans i18nKey="info-theorem-p4" />
        </p>

        {/* ########## How to use ########## */}

        <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
          {t("info-how-title")}
        </p>
        <p className="mb-2">{t("info-how-p1")}</p>
        <ul className="list-disc list-inside mb-2">
          <li>
            <CompTrans i18nKey="info-how-l1" />
          </li>
          <li>
            <CompTrans i18nKey="info-how-l2" />
          </li>
          <li>
            <CompTrans i18nKey="info-how-l3" />
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
            <CompTrans i18nKey="info-people-l1" />
          </p>
          <p>
            <CompTrans i18nKey="info-people-l2" />
          </p>
          <p>
            <CompTrans i18nKey="info-people-l3" />
          </p>
          <p>
            <CompTrans i18nKey="info-people-l4" />
          </p>

          <p className="mt-2">
            {isDesktop ? t("info-people-p3") : t("info-people-p3-mobile")}
          </p>
        </div>

        {/* ########## The Pizza Panel ########## */}

        <div className="mb-5">
          <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
            {t("info-pizza-title")}
          </p>
          <p className="mb-2">{t("info-pizza-p1")}</p>
          <p className="mb-4">{t("info-pizza-p2")}</p>
          <p className="mb-2 underline">{t("info-pizza-p3")}</p>
          <div className="w-40 mb-2">
            <DietSelector tabIndex={0} value={diet} onChange={setDiet} />
          </div>
          <p>
            <CompTrans i18nKey="info-pizza-l1" />
            <CompTrans i18nKey="info-pizza-l2" />
            <CompTrans i18nKey="info-pizza-l3" />
            <CompTrans i18nKey="info-pizza-l4" />
          </p>
          <p className="mb-2">
            <CompTrans i18nKey="info-pizza-p4" />
          </p>
          <p>
            <CompTrans i18nKey="info-pizza-p5" />
          </p>
          <p className="mt-4">
            <CompTrans i18nKey="info-pizza-p6" />
          </p>
          <p className="mt-4">
            <CompTrans i18nKey="info-pizzeria-p1" />
          </p>
          <p>
            <CompTrans i18nKey="info-pizzeria-p2" />
          </p>
        </div>

        {/* ########## The Result Panel ########## */}

        <div className="mb-5">
          <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
            {t("info-result-title")}
          </p>
          <p className="mb-2">{t("info-result-p1")}</p>
          <Mobile>
            <p>{t("info-result-expandable-mobile")}</p>
          </Mobile>
          <p className="mb-2">{t("info-result-p2")}</p>
          <EitherDesktopOrMobile>
            <div className="w-64 flex mb-2">
              <div className="text-3xl font-bold mr-2 w-full">
                <div className="mb-2 flex justify-center">
                  <img
                    src={priceIcon}
                    className="size-8"
                    alt={t("alt-cash-icon")}
                  />
                </div>
                <div className="bg-lime-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
                  <span className="text-lg">
                    4 € / {t("info-display-person")}
                  </span>
                  <span className="text-lg">
                    12 € {t("info-display-total")}
                  </span>
                </div>
              </div>
              <div className="text-3xl font-bold w-full">
                <div className="mb-2 flex justify-center">
                  <img
                    src={sliceIcon}
                    className="size-8"
                    alt={t("alt-pizza-icon")}
                  />
                </div>
                <div className="bg-amber-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
                  <span className="text-lg">4 {t("info-display-slices")}</span>
                  <span className="text-lg">
                    ~1/2 {t("info-display-pizzas")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <div
                className={`bg-amber-400 rounded-lg w-1/2 flex justify-between px-2 font-bold items-center h-14`}
              >
                <img
                  src={sliceIcon}
                  className="size-6"
                  alt={t("alt-pizza-icon")}
                  data-testid="quantity-flag-icon"
                />
                <div className="flex flex-col w-full">
                  <span
                    className="text-lg text-right"
                    data-testid="quantity-flag-pizzas"
                  >
                    1/2{" "}
                    <span className="text-sm">{t("info-display-pizzas")}</span>
                  </span>

                  <span
                    className="text-lg text-right"
                    data-testid="quantity-flag-pizzas"
                  >
                    4{" "}
                    <span className="text-sm">{t("info-display-slices")}</span>
                  </span>
                </div>
              </div>
              <div
                className={`bg-lime-400 rounded-lg w-1/2 flex justify-between px-2 font-bold items-center h-14`}
              >
                <img
                  src={priceIcon}
                  className="size-6"
                  alt={t("alt-cash-icon")}
                  data-testid="price-flag-icon"
                />
                <div className="flex flex-col w-full">
                  <span className="text-base text-right w-full">
                    28 € {t("info-display-total")}
                  </span>
                  <div className="flex justify-between w-full">
                    <span className="text-base text-right w-full">
                      14 € / {t("info-display-person")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </EitherDesktopOrMobile>

          <hr className="my-2 border-black w-[90%] mx-[5%]" />

          <p className="mb-2">{t("info-result-p4")}</p>
          <div
            className={`flex items-center ${
              isDesktop ? "w-[500px]" : "flex-col mb-8"
            }`}
          >
            <div
              className={`h-full ${
                isDesktop ? "mr-2 mb-4" : ""
              } text-center min-w-32`}
            >
              <PizzaFlag
                diet="vegetarian"
                flagState={flagStates[flagStateIndex]}
              />
            </div>
            <p className="translate-y-3">
              <CompTrans i18nKey={flagStatesDescriptions[flagStateIndex]} />
            </p>
          </div>
          <p className="mb-2">
            <CompTrans i18nKey="info-result-p5" />
          </p>

          <p>
            <CompTrans i18nKey="info-result-p6" />
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>
              <CompTrans i18nKey="info-result-p7" />
            </li>
            <li>
              <CompTrans
                i18nKey={isDesktop ? "info-result-p8" : "info-result-p8-mobile"}
              />
            </li>
          </ul>

          <p className="underline">{t("info-suggester-title")}</p>

          <p>{t("info-suggester-p1")}</p>
          <p>{t("info-suggester-p2")}</p>
          <p>{t("info-suggester-p3")}</p>
          <p>{t("info-suggester-p4")}</p>
          <CompTrans i18nKey="info-suggester-p5" />
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
