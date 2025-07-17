import { Pizza } from "../modules/pizzas/slice";

export const desktopSize = "1100px";

export const smallMobile = "759px";

export const LIGHT_FAIRNESS_MIN = 110;

const normalPizza: Pizza = {
  eatenBy: "normal",
  id: 0,
  name: "",
  price: 0,
  quantity: 0,
  editable: false,
};

const pescoVegetarianPizza: Pizza = {
  eatenBy: "pescoVegetarian",
  id: 1,
  name: "",
  price: 0,
  quantity: 0,
  editable: false,
};

const vegetarianPizza: Pizza = {
  eatenBy: "vegetarian",
  id: 2,
  name: "",
  price: 0,
  quantity: 0,
  editable: false,
};

const veganPizza: Pizza = {
  eatenBy: "vegan",
  id: 3,
  name: "",
  price: 0,
  quantity: 0,
  editable: false,
};

export const lightPizzas: Pizza[] = [
  normalPizza,
  pescoVegetarianPizza,
  vegetarianPizza,
  veganPizza,
];
