import title from "../../assets/Title.png";
import { Container } from "../utils/Container";
import { LanguageSelector } from "../infos/LanguageSelector";
import { Spinner } from "../utils/Spinner";
import { LightPizzaForm } from "../light-page/LightPizzaForm";
import { LightSuggestion } from "../light-page/LightSuggestion";
import { useSelector } from "react-redux";
import { lightStateSelector } from "../../modules/light-pizzas/selector";

export function LightPage() {
  const state = useSelector(lightStateSelector);

  return (
    <div>
      <div className="flex justify-center">
        <img src={title} className={`w-[600px] mt-4`} alt="Pizza Party Maker" />
      </div>
      <div className="flex w-full justify-end">
        <LanguageSelector />
      </div>
      <Container styleClassName="flex flex-col">
        <div className="w-[700px]"></div>
        {state === "form" && <LightPizzaForm />}
        {state === "loading" && <Spinner />}
        {state === "done" && <LightSuggestion />}
      </Container>
    </div>
  );
}
