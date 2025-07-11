import title from "../../assets/Title.png";
import { Container } from "../utils/Container";
import { LanguageSelector } from "../infos/LanguageSelector";
import { Spinner } from "../utils/Spinner";
import { LightPizzaForm } from "../light-page/LightPizzaForm";
import { LightSuggestion } from "../light-page/LightSuggestion";
import { useSelector } from "react-redux";
import { lightStateSelector } from "../../modules/light-pizzas/selector";
import { desktopSize } from "../../services/constants";
import { useMediaQuery } from "react-responsive";
import { Desktop } from "../utils/ReactiveComponents";
import { Link } from "react-router-dom";
import { History } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Footer } from "./Footer";

export function LightPage() {
  const state = useSelector(lightStateSelector);
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });
  const { t } = useTranslation();

  return (
    <div
      className={
        isDesktop
          ? ""
          : "bg-amber-100 min-h-[calc(100dvh-3rem)] flex flex-col justify-between"
      }
    >
      <Desktop>
        <div className="flex justify-center">
          <img
            src={title}
            className={`w-[600px] mt-4`}
            alt="Pizza Party Maker"
          />
        </div>
        <div className="flex gap-2 items-center w-full justify-end">
          <Link to="/old" title={t("go-previous-ver")}>
            <History
              size={30}
              color="gray"
              strokeWidth={2}
              className="hover:fill-amber-300 hover:stroke-amber-700"
            />
          </Link>
          <LanguageSelector />
        </div>
      </Desktop>
      <Container
        styleClassName={`flex flex-col ${
          !isDesktop && "rounded-none border-none"
        }`}
      >
        <div className={`${isDesktop ? "w-[700px]" : "w-full"}`}></div>
        {state === "form" && <LightPizzaForm />}
        {state === "loading" && <Spinner />}
        {state === "done" && <LightSuggestion />}
      </Container>
      <Desktop>
        <Footer />
      </Desktop>
    </div>
  );
}
