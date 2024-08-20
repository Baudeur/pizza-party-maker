import { Diet } from "../types";

export function shuffleArray<T>(array: Array<T>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const acceptableValues = [
  "0",
  "1",
  "1/2",
  "1/3",
  "2/3",
  "1/4",
  "3/4",
  "1/5",
  "2/5",
  "3/5",
  "4/5",
  "1/6",
  "5/6",
  "1/8",
  "3/8",
  "5/8",
  "7/8",
];

export function toUnderstandableRational(slicesAte: number, slices: number) {
  function parseRational(str: string): number {
    if (str === "0" || str === "1") return Number(str);
    const splitted = str.split("/");
    return Number(splitted[0]) / Number(splitted[1]);
  }
  let value = slicesAte / slices;
  const entier = Math.floor(value);
  value = value - entier;
  let res = "";
  let best = 1;
  for (const elem of acceptableValues) {
    const ecart = Math.abs(value - parseRational(elem));
    if (ecart < best) {
      res = elem;
      best = ecart;
    }
  }
  if (res === "0") return entier.toString();
  if (res === "1") return (entier + 1).toString();
  if (entier === 0) return "~" + res;
  return "~" + entier.toString() + "+" + res;
}

export function calcDiet(diet: Diet, type: "prev" | "next"): Diet {
  if (type === "prev") {
    if (diet === "vegan") return "vegetarian";
    if (diet === "vegetarian") return "pescoVegetarian";
    return "normal";
  } else {
    if (diet === "normal") return "pescoVegetarian";
    if (diet === "pescoVegetarian") return "vegetarian";
    return "vegan";
  }
}
