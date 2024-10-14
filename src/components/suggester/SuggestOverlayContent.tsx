import { useEffect, useState } from "react";
import {
  SuggestedQuantityPerPizza,
  SuggestMode,
  suggestPizzas,
} from "../../services/suggestionService";
import { DropDown } from "../utils/DropDown";
import { Button } from "../utils/Button";
import { useDispatch, useSelector } from "react-redux";
import { pizzasSelector } from "../../modules/pizzas/selector";
import { peopleSelector } from "../../modules/people/selector";
import { Spinner } from "../utils/Spinner";
import { SuggestionDisplay } from "./SuggestionDisplay";
import { modifyPizza } from "../../modules/pizzas/slice";

const optionsInit = [
  { value: 1 / 8, label: "1/8" },
  { value: 1 / 6, label: "1/6" },
  { value: 1 / 5, label: "1/5" },
  { value: 1 / 4, label: "1/4" },
  { value: 1 / 3, label: "1/3" },
  { value: 3 / 8, label: "3/8" },
  { value: 2 / 5, label: "2/5" },
  { value: 1 / 2, label: "1/2" },
  { value: 3 / 5, label: "3/5" },
  { value: 5 / 8, label: "5/8" },
  { value: 2 / 3, label: "2/3" },
  { value: 3 / 4, label: "3/4" },
  { value: 4 / 5, label: "4/5" },
  { value: 5 / 6, label: "5/6" },
  { value: 7 / 8, label: "7/8" },
  { value: 1, label: "1" },
];

type SuggestOverlayContentProps = {
  close: () => void;
};

export function SuggestOverlayContent({
  close,
}: Readonly<SuggestOverlayContentProps>) {
  const [fairness, setFairness] = useState(1.25);
  const [suggestMode, setSuggestMode] = useState<SuggestMode>("lowerCost");
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] =
    useState<{ value: number; label: string }[]>(optionsInit);

  const pizzas = useSelector(pizzasSelector);
  const people = useSelector(peopleSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<
    SuggestedQuantityPerPizza | undefined
  >();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const image = new Image(1, 1);
  image.src = "/src/assets/LoadingOmni.png";

  function addChoices() {
    const addValue = options[options.length - 1].value;
    if (addValue === 100) return;
    const newOptions = options.concat(
      optionsInit.map(({ value: val, label }) => ({
        value: val + addValue,
        label: addValue + " + " + label,
      }))
    );
    newOptions[newOptions.length - 1].label = addValue + 1 + "";
    setOptions(newOptions);
  }

  useEffect(() => {
    return () => {
      setFairness(1.25);
      setQuantity(1);
      setSuggestMode("lowerCost");
      setOptions(optionsInit);
    };
  }, []);

  const handleCompute = () => {
    setIsLoading(true);
    setError(false);
    setTimeout(() => {
      let suggest = undefined;
      try {
        suggest = suggestPizzas(
          pizzas,
          people,
          quantity,
          suggestMode,
          fairness
        );
      } catch {
        setError(true);
      }
      setSuggestions(suggest);
      setIsLoading(false);
    }, 20);
  };

  const handleApply = () => {
    pizzas.forEach((pizza) => {
      const suggestedQuantity = suggestions?.get(pizza) ?? 0;
      const suggestedPizza = { ...pizza, quantity: suggestedQuantity };
      dispatch(modifyPizza(suggestedPizza));
    });
    close();
  };

  return (
    <div className="w-[500px]">
      <p className="text-xl bg-amber-300 rounded-lg px-2 font-bold mb-2 text-center w-full">
        Select you suggestion parameters
      </p>
      <p className="mb-2">
        This form will suggest you an order based on certain parameters
      </p>
      <div className="flex flex-col gap-2">
        <div className="px-2 flex gap-2 w-full">
          <div>Unfairness:</div>
          <div className="bg-white font-bold w-16 text-center h-full rounded-lg">
            {(fairness * 100).toFixed(0)}%
          </div>
          <input
            className="accent-green-500"
            type="range"
            value={fairness}
            onChange={(e) => setFairness(Number(e.target.value))}
            min={1.05}
            max={2}
            step={0.05}
          />
        </div>
        <div className="flex w-full gap-2 items-center">
          <div className="pl-2">Strategy:</div>
          <DropDown<string>
            className="w-[175px]"
            options={[
              { value: "lowerCost", label: "Minimal cost" },
              { value: "maxDiversity", label: "Maximal diversity" },
            ]}
            value={suggestMode}
            onChange={(value) => setSuggestMode(value as SuggestMode)}
          />
        </div>
        <div className="flex w-full gap-2 items-center">
          <div className="pl-2">Quantity per persons:</div>
          <DropDown<number>
            className="w-[100px]"
            options={options}
            value={quantity}
            onChange={(value) => setQuantity(value)}
            onScrollBottom={addChoices}
          />
        </div>
        <Button
          color="green"
          onClick={handleCompute}
          className="rounded-lg font-bold disabled:bg-gray-200 disabled:text-gray-400"
          disabled={isLoading}
        >
          Compute suggestion
        </Button>
        {error && (
          <span className="text-red-500 font-bold text-sm">
            Error: the pizza list is missing diets that people in your group
            have.
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
            >
              Apply suggestion
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
