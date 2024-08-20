import { Diet } from "../../types";

type FoodSliderProps = {
  value: Diet;
  onChange: (value: Diet) => void;
};

export function FoodSlider({ value, onChange }: FoodSliderProps) {
  function dietToString(diet: Diet): string {
    switch (diet) {
      case "normal":
        return "0";
      case "pescoVegetarian":
        return "1";
      case "vegetarian":
        return "2";
      case "vegan":
        return "3";
    }
  }
  function stringToDiet(string: string): Diet {
    switch (string) {
      case "0":
        return "normal";
      case "1":
        return "pescoVegetarian";
      case "2":
        return "vegetarian";
      case "3":
        return "vegan";
      default:
        return "normal";
    }
  }

  return (
    <div className="flex flex-col px-2">
      <input
        className="accent-green-500 w-full h-8"
        type="range"
        value={dietToString(value)}
        onChange={(e) => onChange(stringToDiet(e.target.value))}
        min="0"
        max="3"
      />
      <div className="w-full flex relative">
        <span className="absolute -translate-x-1/2 left-[10px]">🍗</span>
        <span className="absolute -translate-x-1/2 left-[calc(((100%-20px)/3)+10px)]">
          🐟
        </span>
        <span className="absolute -translate-x-1/2 left-[calc(((100%-20px)*2/3)+10px)]">
          🧀
        </span>
        <span className="absolute translate-x-1/2 right-[10px]">🥕</span>
      </div>
    </div>
  );
}
