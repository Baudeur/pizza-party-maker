import { useSelector } from "react-redux";
import { pizzeriasSelector } from "../../modules/pizzerias/selector";
import { ArrowDownToLine, Trash2 } from "lucide-react";
import { Button } from "../utils/Button";
import {
  loadPizzeria,
  Pizzeria,
  removePizzeria,
} from "../../modules/pizzerias/slice";
import { useContext } from "react";
import { PizzeriaDisplayer } from "./PizzeriaDisplayer";
import { CloseContext } from "../utils/OverlayInside";
import { useTranslation } from "react-i18next";
import { Accordeon } from "../utils/Accordeon";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { formatNameForTestId } from "../../services/utils";
import { useAppDispatch } from "../../hooks";
import { Desktop } from "../utils/ReactiveComponents";

export function ManagePizzeriaOverlayContent() {
  const { t } = useTranslation();
  const pizzerias = useSelector(pizzeriasSelector);
  const dispatch = useAppDispatch();
  const close = useContext(CloseContext);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  const handleLoad = (pizzeria: Pizzeria) => {
    dispatch(loadPizzeria(pizzeria.id));
    close();
  };

  return (
    <div
      className={`${
        isDesktop ? "w-[750px] h-[80dvh]" : "h-[calc(80dvh-5rem)]"
      } py-4 overflow-y-auto`}
    >
      {pizzerias.length === 0 && <div>{t("no-pizzerias")}</div>}
      <Accordeon
        className={`${isDesktop ? "" : "w-full"}`}
        height={"15.25rem"}
        elements={pizzerias.map((p) => ({
          expandable: p,
          header: (
            <div className="flex justify-between items-center h-10 w-full">
              <div className="flex items-center w-full relative">
                <span className="text-xl absolute right-0 left-0 truncate">
                  {p.name}
                </span>
              </div>
              <div className="flex gap-2 ml-2">
                <Button
                  color="green"
                  onClick={(e) => {
                    handleLoad(p);
                    e.stopPropagation();
                  }}
                  className="rounded-lg px-2"
                  testId={`manage-${formatNameForTestId(p.name)}-load-button`}
                  title={t("load-pizzeria", { pizzeriaName: p.name })}
                >
                  <ArrowDownToLine size={20} strokeWidth={2} />
                  <Desktop>
                    <span className="ml-1">
                      {t("manage-pizzeria-load-button")}
                    </span>
                  </Desktop>
                </Button>
                <Button
                  color="red"
                  onClick={(e) => {
                    dispatch(removePizzeria(p.id));
                    e.stopPropagation();
                  }}
                  className="rounded-lg px-2"
                  testId={`manage-${formatNameForTestId(p.name)}-delete-button`}
                  title={t("delete-pizzeria", { pizzeriaName: p.name })}
                >
                  <Trash2 size={20} strokeWidth={2} />
                  <Desktop>
                    <span className="ml-1">{t("delete")}</span>
                  </Desktop>
                </Button>
              </div>
            </div>
          ),
          expand: (
            <PizzeriaDisplayer
              pizzeria={p}
              testId={formatNameForTestId(p.name)}
              className="border-none max-h-[14.25rem] "
            />
          ),
        }))}
      />
    </div>
  );
}
