import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { Desktop, Mobile } from "../utils/ReactiveComponents";
import { CompTrans } from "../utils/TranslationComponents";
import { dietTranslationMap } from "../../types";
import { DietIcon } from "../icons/DietIcon";
import { IntegerInput } from "../utils/IntegerInput";
import sliceIcon from "../../assets/Pizza.png";
import { LightPizzaFlag } from "../utils/PizzaFlag";
import { ArrowBigUp } from "lucide-react";

export function LightAboutOverlayContent() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  return (
    <div
      className={`${
        isDesktop ? "w-[750px]" : "h-full"
      } overflow-y-auto pt-4 h-[80dvh]`}
    >
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
      <div className={`text-left`}>
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

        <p className="text-xl bg-amber-300 w-fit rounded-md px-2 font-bold mb-2">
          {t("light-about-how-to")}
        </p>
        <div
          className={`w-full flex items-start gap-4 mb-4 ${
            !isDesktop && "flex-col"
          }`}
        >
          <p>
            <CompTrans i18nKey="light-about-p1" />
          </p>
          <div className={`flex gap-2`}>
            <div className="flex-col flex items-center gap-1">
              <span className="text-lg font-bold">
                {t(dietTranslationMap.get("vegetarian") ?? "")}
              </span>
              <div className="flex items-center gap-2">
                <DietIcon
                  type={"vegetarian"}
                  color="Color"
                  className="size-7"
                />
                <IntegerInput
                  className="text-2xl"
                  value={5}
                  setValue={() => {}}
                  title={{
                    value: `vegetarian-person`,
                    isKey: true,
                    isFeminin: true,
                  }}
                />
              </div>
            </div>
            <div className="flex-col flex items-center gap-1">
              <span className="text-lg font-bold">
                {t(dietTranslationMap.get("pescoVegetarian") ?? "")}
              </span>
              <div className="flex items-center gap-2">
                <DietIcon
                  type={"pescoVegetarian"}
                  color="Color"
                  className="size-7"
                />
                <IntegerInput
                  className="text-2xl"
                  value={5}
                  setValue={() => {}}
                  title={{
                    value: `pescoVegetarian-person`,
                    isKey: true,
                    isFeminin: true,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <p>
          <CompTrans i18nKey="light-about-p2" />
        </p>
        <p>
          <CompTrans i18nKey="light-about-p3" />
        </p>
        <p>
          <CompTrans i18nKey="light-about-p4" />
        </p>
        <p className="mb-5">
          <CompTrans i18nKey="light-about-p5" />
        </p>

        <p className="text-xl bg-amber-300 w-fit rounded-md px-2 font-bold mb-2">
          {t("light-about-change")}
        </p>
        <p>{t("light-about-p6")}</p>

        <ul className="list-disc list-inside mb-2">
          <li>
            <CompTrans i18nKey="light-about-p7" />
          </li>
          <li>
            <Desktop>
              <CompTrans i18nKey="light-about-p8" />
            </Desktop>
            <Mobile>
              <CompTrans i18nKey="light-about-p8-short" />
            </Mobile>
            <div
              className={`bg-amber-300 rounded-lg flex items-center w-fit min-w-72 cursor-default border-2 border-orange-700`}
              data-testid={"quantity-flag"}
            >
              <div
                className={`flex items-center justify-center rounded-lg shadow-[10px_0px_15px_-3px_rgb(0,0,0,0.1),4px_0px_6px_-4px_rgb(0,0,0,0.1)]`}
              >
                <span>
                  <img src={sliceIcon} className="size-5 m-2" />
                </span>
              </div>
              <div className="flex justify-center w-[calc(100%-1.75rem)]">
                <span
                  className={`font-bold flex items-center text-lg text-orange-700
            `}
                >
                  <ArrowBigUp
                    className="fill-orange-700"
                    stroke="black"
                    strokeWidth={0}
                  />
                  {t("light-quantity-extra", { count: 4 })}
                </span>
              </div>
            </div>
          </li>
          <p className="text-red-500 font-bold">{t("light-about-p10")}</p>
          <li>
            <CompTrans i18nKey="light-about-p9" />
          </li>
        </ul>
        <p>{t("light-about-p11")}</p>
        <div className="flex gap-2 w-fit my-2">
          <LightPizzaFlag diet={"normal"} quantity={9} />
          <LightPizzaFlag diet={"vegetarian"} quantity={6} />
        </div>
        <p>{t("light-about-p12")}</p>

        <p className="my-5">{t("light-about-p13")}</p>
      </div>
    </div>
  );
}
