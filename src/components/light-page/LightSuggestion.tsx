import { useTranslation } from "react-i18next";
import { Button } from "../utils/Button";
import { Pencil, RotateCcw } from "lucide-react";
import { LightSuggestionDisplay } from "./LightSuggestionDisplay";
import { useAppDispatch } from "../../hooks";
import { setLightState } from "../../modules/light-pizzas/slice";
import { useMemo, useState } from "react";
import { diets } from "../../types";
import { useSelector } from "react-redux";
import { peopleSelector } from "../../modules/people/selector";
import { desktopSize } from "../../services/constants";
import { useMediaQuery } from "react-responsive";
import { LightFlags } from "./LightFlags";

export function LightSuggestion() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const people = useSelector(peopleSelector);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  const onlyOneDiet = useMemo(
    () =>
      diets.reduce((acc, curr) => (people[curr] === 0 ? acc : acc + 1), 0) ===
      1,
    [people]
  );

  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-xl">{t("light-suggestion-title")}</p>
      <div className="flex flex-col gap-2 justify-between text-xl font-bold w-full">
        <LightSuggestionDisplay diet="normal" edit={edit} />
        <LightSuggestionDisplay diet="pescoVegetarian" edit={edit} />
        <LightSuggestionDisplay diet="vegetarian" edit={edit} />
        <LightSuggestionDisplay diet="vegan" edit={edit} />
      </div>
      {edit ? (
        <div className="w-full flex flex-col items-center gap-2">
          <p className={isDesktop ? "text-xl w-[600px] text-wrap" : ""}>
            {t("light-suggestion-flag")}
          </p>
          <LightFlags />
        </div>
      ) : (
        <>
          {onlyOneDiet && (
            <span className="text-sm text-gray-600">{t("light-why")}</span>
          )}
          <Button
            onClick={() => {
              setEdit(true);
            }}
            color="green"
            title={t("light-edit-button")}
            className="rounded-lg px-2 gap-2 text-xl"
          >
            <Pencil size={20} />
            {t("light-edit-button")}
          </Button>
        </>
      )}
      <Button
        onClick={() => dispatch(setLightState("form"))}
        color="orange"
        title={t("light-back-button")}
        className="rounded-lg px-2 gap-2 text-xl mt-8"
      >
        <RotateCcw size={20} />
        {t("light-back-button")}
      </Button>
    </div>
  );
}
