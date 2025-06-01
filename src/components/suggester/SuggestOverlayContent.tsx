import { useEffect, useState } from "react";
import {
  SuggestedQuantityPerPizza,
  SuggestMode,
  suggestPizzas,
} from "../../services/suggestionService";
import { DropDown } from "../utils/DropDown";
import { Button } from "../utils/Button";
import { useSelector } from "react-redux";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { peopleSelector } from "../../modules/people/selector";
import { Spinner } from "../utils/Spinner";
import { SuggestionDisplay } from "./SuggestionDisplay";
import { modifyPizza } from "../../modules/pizzas/slice";
import spinner from "../../assets/LoadingOmni.png";
import workerUrl from "/src/services/workerService?worker&url";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";
import { okayThresoldsSelector } from "../../modules/params/selector";
import { closeOverlay } from "../../modules/overlays/slice";
import { useAppDispatch } from "../../hooks";
import { CircleHelp } from "lucide-react";
import { Tooltip } from "../utils/Tooltip";
import { Desktop, Mobile } from "../utils/ReactiveComponents";

const optionsInit = [
  { title: "1/8", value: 1 / 8, label: "1/8" },
  { title: "1/6", value: 1 / 6, label: "1/6" },
  { title: "1/5", value: 1 / 5, label: "1/5" },
  { title: "1/4", value: 1 / 4, label: "1/4" },
  { title: "1/3", value: 1 / 3, label: "1/3" },
  { title: "3/8", value: 3 / 8, label: "3/8" },
  { title: "2/5", value: 2 / 5, label: "2/5" },
  { title: "1/2", value: 1 / 2, label: "1/2" },
  { title: "3/5", value: 3 / 5, label: "3/5" },
  { title: "5/8", value: 5 / 8, label: "5/8" },
  { title: "2/3", value: 2 / 3, label: "2/3" },
  { title: "3/4", value: 3 / 4, label: "3/4" },
  { title: "4/5", value: 4 / 5, label: "4/5" },
  { title: "5/6", value: 5 / 6, label: "5/6" },
  { title: "7/8", value: 7 / 8, label: "7/8" },
  { title: "1", value: 1, label: "1" },
];

export function SuggestOverlayContent() {
  const { t } = useTranslation();
  const okay = useSelector(okayThresoldsSelector);
  const [fairness, setFairness] = useState(okay);
  const [suggestMode, setSuggestMode] = useState<SuggestMode>("lowerCost");
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] =
    useState<{ title: string; value: number; label: string }[]>(optionsInit);

  const pizzas = useSelector(pizzasSelector);
  const people = useSelector(peopleSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<
    SuggestedQuantityPerPizza | undefined
  >();
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery({ minDeviceWidth: desktopSize });

  new Image(1, 1).src = spinner; //preload spinner image

  function addChoices() {
    const addValue = options[options.length - 1].value;
    if (addValue === 100) return;
    const newOptions = options.concat(
      optionsInit.map(({ value: val, label }) => ({
        title: `${val + addValue}`,
        value: val + addValue,
        label: addValue + " + " + label,
      }))
    );
    newOptions[newOptions.length - 1].label = addValue + 1 + "";
    setOptions(newOptions);
  }

  useEffect(() => {
    return () => {
      setFairness(okay);
      setQuantity(1);
      setSuggestMode("lowerCost");
      setOptions(optionsInit);
    };
  }, [okay]);

  const handleCompute = () => {
    setIsLoading(true);
    setError(false);

    if (window.Worker) {
      const suggestWorker = new Worker(workerUrl, { type: "module" });
      suggestWorker.onmessage = (ev) => {
        setSuggestions(ev.data);
        setIsLoading(false);
      };
      suggestWorker.onerror = (event) => {
        event.preventDefault();
        setError(true);
        setIsLoading(false);
      };
      suggestWorker.postMessage({
        pizzas,
        people,
        minQuantity: quantity,
        suggestMode,
        fairness,
      });
    } else {
      try {
        setSuggestions(
          suggestPizzas(pizzas, people, quantity, suggestMode, fairness)
        );
      } catch {
        setError(true);
      }
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    const ids: number[] = [];
    suggestions?.forEach((value, key) => {
      const pizza = pizzas.find((pz) => pz.id === key.id);
      if (pizza === undefined) throw Error("Suggested pizza does not exist");
      const suggestedPizza = { ...pizza, quantity: value };
      ids.push(key.id);
      dispatch(modifyPizza(suggestedPizza));
    });
    pizzas.forEach((pizza) => {
      if (!ids.includes(pizza.id)) {
        const suggestedPizza = { ...pizza, quantity: 0 };
        dispatch(modifyPizza(suggestedPizza));
      }
    });
    dispatch(closeOverlay());
  };

  return (
    <div className={`${isDesktop && "w-[500px]"} py-4`}>
      <p className="mb-2">{t("suggester-description")}</p>
      <div className="flex flex-col gap-2">
        <Mobile>
          <hr className="border-black" />
        </Mobile>
        <div
          className={`flex w-full gap-2  ${
            isDesktop ? "items-center" : "flex-col"
          }`}
        >
          <div
            className={`${isDesktop ? "w-2/5 text-right" : "w-full text-left"}`}
            data-testid="suggester-quantity-label"
          >
            {t("suggester-quantity")}
          </div>
          <DropDown<number>
            className="w-[100px]"
            options={options}
            value={quantity}
            onChange={(value) => setQuantity(value)}
            onScrollBottom={addChoices}
            testId="suggester-quantity-dropdown"
            title={t("suggester-quantity-description")}
          />
        </div>
        <Mobile>
          <hr className="border-black" />
        </Mobile>
        <div
          className={`flex w-full gap-2  ${
            isDesktop ? "items-center" : "flex-col"
          }`}
        >
          <div
            className={`${
              isDesktop ? "w-2/5 justify-end" : "w-full"
            } flex gap-2 items-center`}
          >
            <div
              className={`${isDesktop ? "text-right" : "text-left"}`}
              data-testid="suggester-strategy-label"
            >
              {t("suggester-strategy")}
            </div>

            <Mobile>
              <Tooltip content={t("suggester-strategy-help")}>
                <CircleHelp size={20} />
              </Tooltip>
            </Mobile>
          </div>
          <DropDown<string>
            className="w-[175px]"
            options={[
              {
                title: t("suggester-strategy-minimal-description"),
                value: "lowerCost",
                label: t("suggester-strategy-minimal"),
              },
              {
                title: t("suggester-strategy-maximal-description"),
                value: "maxDiversity",
                label: t("suggester-strategy-maximal"),
              },
            ]}
            value={suggestMode}
            onChange={(value) => setSuggestMode(value as SuggestMode)}
            testId="suggester-strategy-dropdown"
            title={t("suggester-strategy-selection")}
          />
          <Desktop>
            <Tooltip content={t("suggester-strategy-help")}>
              <CircleHelp size={20} />
            </Tooltip>
          </Desktop>
        </div>
        <Mobile>
          <hr className="border-black" />
        </Mobile>
        <div
          className={`${
            isDesktop ? "px-2 items-center" : "pr-2 flex-col"
          } flex gap-2  w-full`}
        >
          <div
            className={`${
              isDesktop ? "w-2/5 justify-end" : "w-full"
            } flex gap-2 items-center`}
          >
            <div className={`${isDesktop && "text-right"}`}>
              {t("suggester-unfairness")}
            </div>
            <Mobile>
              <Tooltip content={t("suggester-unfairness-help")}>
                <CircleHelp size={20} />
              </Tooltip>
            </Mobile>
          </div>
          <div className={`${isDesktop ? " w-1/2" : "w-full"} flex gap-2`}>
            <div
              className={`bg-white font-bold ${
                isDesktop ? "w-20" : "px-1"
              } text-center h-full rounded-lg`}
            >
              {fairness - 100}%
            </div>
            <input
              className={`accent-green-500 touch-none ${
                isDesktop ? "w-full" : "w-full"
              }`}
              type="range"
              value={fairness}
              title={t("suggester-unfairness-description")}
              onChange={(e) => setFairness(Number(e.target.value))}
              min={105}
              max={200}
              step={5}
              data-testid="suggester-fairness-slider"
            />
          </div>
          <Desktop>
            <Tooltip content={t("suggester-unfairness-help")}>
              <CircleHelp size={20} />
            </Tooltip>
          </Desktop>
        </div>
        <Button
          color="green"
          onClick={handleCompute}
          className="rounded-lg font-bold"
          disabled={isLoading}
          testId="suggester-compute-button"
          title={t("suggester-compute")}
        >
          {t("suggester-compute")}
        </Button>
        {error && (
          <span
            className="text-red-500 font-bold text-sm"
            data-testid="suggester-error-message"
          >
            {t("suggester-error")}
          </span>
        )}
        {isLoading && <Spinner />}
        {suggestions !== undefined && !isLoading && (
          <div>
            <SuggestionDisplay pizzas={suggestions} />
            <Button
              color="green"
              onClick={handleApply}
              className="w-full font-bold rounded-lg mt-2"
              testId="suggester-apply-button"
              title={t("suggester-apply")}
            >
              {t("suggester-apply")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
