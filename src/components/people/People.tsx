import { useSelector } from "react-redux";
import { Container } from "../utils/Container";
import { PeopleCategory } from "./PeopleCategory";
import { peopleSelector } from "../../modules/people/selector";
import { diets } from "../../types";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { Desktop, Mobile } from "../utils/ReactiveComponents";

export function People() {
  const { t } = useTranslation();
  const people = useSelector(peopleSelector);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  return (
    <Container
      className={`${!isDesktop && "rounded-none border-x-0"}`}
      testId="people-panel"
    >
      <div className={`${!isDesktop && "flex justify-between px-5"}`}>
        <div className="text-xl font-bold mb-2">{t("people-panel-title")}</div>
        <Mobile>
          <div className="text-xl font-bold" data-testid="people-total">
            {t("people-panel-total", {
              total: diets.reduce((acc, curr) => acc + people[curr], 0),
            })}
          </div>
        </Mobile>
      </div>
      <div className={`${!isDesktop && "flex flex-col items-center"}`}>
        <div className={`${isDesktop ? "flex flex-col" : "flex gap-5"}`}>
          <PeopleCategory diet="normal" />
          <PeopleCategory diet="pescoVegetarian" />
        </div>
        <div className={`${isDesktop ? "flex flex-col" : "flex gap-5"}`}>
          <PeopleCategory diet="vegetarian" />
          <PeopleCategory diet="vegan" />
        </div>
        <Desktop>
          <div className="text-xl font-bold" data-testid="people-total">
            {t("people-panel-total", {
              total: diets.reduce((acc, curr) => acc + people[curr], 0),
            })}
          </div>
        </Desktop>
      </div>
    </Container>
  );
}
