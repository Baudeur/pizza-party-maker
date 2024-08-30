import { useEffect, useState } from "react";
import { SuggestMode } from "../../services/suggestionService";
import { DropDown } from "../utils/DropDown";
import { Button } from "../utils/Button";

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

export function SuggestOverlayContent() {
  const [fairness, setFairness] = useState(1.25);
  const [suggestMode, setSuggestMode] = useState<SuggestMode>("lowerCost");
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] =
    useState<{ value: number; label: string }[]>(optionsInit);
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

  return (
    <div className="w-[500px]">
      <p className="text-xl bg-amber-300 rounded-lg px-2 font-bold mb-2 text-center w-full">
        Select you suggestion parameters
      </p>
      <p>This form will suggest you an order based on certain parameters</p>
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
            className="w-[150px]"
            options={[
              { value: "lowerCost", label: "Minimal cost" },
              { value: "maxDiversity", label: "Maximal diversity" },
            ]}
            value={suggestMode}
            onChange={(value) => setSuggestMode(value as SuggestMode)}
          />
        </div>
        <div className="flex w-full gap-2 items-center">
          <div className="pl-2">Strategy:</div>
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
          onClick={() => {}}
          className="rounded-lg font-bold"
        >
          Compute suggestion
        </Button>
      </div>
    </div>
  );
}
