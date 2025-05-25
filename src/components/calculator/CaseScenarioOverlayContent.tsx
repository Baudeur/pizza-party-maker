import { useTranslation } from "react-i18next";
import { CaseScenario } from "./CaseScenario";
import { CompTrans } from "../utils/TranslationComponents";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";

export function CaseScenarioOverlayContent() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  return (
    <div
      className={`text-left ${
        isDesktop ? "w-[750px] py-4 overflow-y-auto h-[80lvh]" : "w-full h-full"
      }`}
    >
      {/* ########## The detail panel ########## */}

      <div className="mb-5">
        <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
          {t("details-panel-title")}
        </p>
        <p className="mb-2">{t("details-panel-p1")}</p>
        <p className="mb-2">{t("details-panel-p2")}</p>
        <p>{t("details-panel-p3")}</p>
        <div className="w-full text-center">
          <CaseScenario
            peopleAte={{
              normal: 8,
              pescoVegetarian: 6,
              vegetarian: 6,
              vegan: 7,
            }}
            label={t("details-panel-example-case")}
          />
        </div>
        <p className="mb-2">
          <CompTrans i18nKey="details-panel-p4" />
        </p>
        <p>{t("details-panel-p5")}</p>
      </div>

      {/* ########## How is it calculated ########## */}

      <div className="mb-4">
        <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
          {t("details-maths-title")}
        </p>
        <p>{t("details-maths-p1")}</p>
        <p className="mb-4">{t("details-maths-p2")}</p>

        <ul className="list-disc list-inside mb-2">
          <li>
            <CompTrans i18nKey="details-maths-l1" />
          </li>
          <li>{t("details-maths-l2")}</li>
          <li>{t("details-maths-l3")}</li>
          <li>{t("details-maths-l4")}</li>
        </ul>
        <p>
          <CompTrans i18nKey="details-maths-p3" />
        </p>
        <p className="mb-2">{t("details-maths-p4")}</p>
        <p className="mb-4">{t("details-maths-p5")}</p>
        <p>{t("details-maths-p6")}</p>
      </div>

      {/* ########## About flags ########## */}

      <div>
        <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
          {t("details-flags-title")}
        </p>
        <p className="mb-2">{t("details-flags-p1")}</p>
        <p className="mb-2">
          <CompTrans i18nKey="details-flags-p2" />
        </p>
        <p>
          <CompTrans i18nKey="details-flags-p3" />
        </p>
      </div>
    </div>
  );
}
