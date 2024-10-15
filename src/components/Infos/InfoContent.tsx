import { useEffect, useState } from "react";
import { DietIcon } from "../icons/DietIcon";
import { DietSelector } from "../utils/DietSelector";
import { Diet } from "../../types";
import { FlagState, PizzaFlag } from "../utils/PizzaFlag";
import { Button } from "../utils/Button";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Check,
  Info,
  Minus,
  Pencil,
  Plus,
  Trash2,
  Undo2,
} from "lucide-react";

const flagStates: FlagState[] = [
  "perfect",
  "good",
  "okay",
  "bad",
  "cantEat",
  "N/A",
];

const flagStatesDescriptions = [
  "This flag means that vegetarians eat exactly as much as the diet that eats the most.",
  "This flag means that the diet that eats the most eats less that 125% what vegetarians eat.",
  "This flag means that the diet that eats the most eats less that 150% what vegetarians eat.",
  "This flag means that the diet that eats the most eats more that 150% what vegetarians eat.",
  "This flag means that there is nothing to eat for vegetarians.",
  "This flag means that there is no vegetarians in the party.",
];

export function InfoContent() {
  const [diet, setDiet] = useState<Diet>("pescoVegetarian");
  const [flagStateIndex, setFlagStateIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setFlagStateIndex((flagStateIndex + 1) % 6),
      5000
    );
    return () => {
      clearInterval(intervalId);
    };
  }, [flagStateIndex]);
  return (
    <div className="h-[80vh] overflow-y-scroll">
      {/* ########## Introduction ########## */}
      <div className="flex text-2xl items-baseline justify-center mb-4">
        <div>
          <b>Welcome to</b>
        </div>
        <img
          src="/src/assets/Title.png"
          className="h-6 mx-2 translate-y-[5px]"
          alt="Pizza Party Maker"
        />
        <div>
          <b>!</b>
        </div>
      </div>
      <div className="w-[750px] text-left">
        <p className="mb-2">
          This little website is a tool to plan your pizza party.
        </p>
        <p>
          More specifically, it will help you choose the right amount of
          specific diet pizzas for your guests.
        </p>
        <p className="mb-2">
          For instance, imagine you want to create a buffet of pizza for{" "}
          <strong className="text-pink-600">7 persons</strong>, one of them is{" "}
          <strong className="text-green-600">vegetarian</strong>, 2 are{" "}
          <strong className="text-blue-600">pesco-vegetarian</strong> and one is{" "}
          <strong className="text-orange-600">vegan</strong>, and the last 3
          eats meat (I will call them{" "}
          <strong className="text-red-600">omnivorous</strong> for simplicity).
        </p>
        <p className="mb-2">
          <strong>How much of which pizza should you order?</strong>
        </p>
        <p className="mb-6">
          One might make the assumption that you can order{" "}
          <strong className="text-red-600">3 pizzas with meat</strong>,{" "}
          <strong className="text-blue-600">two with fish</strong>,{" "}
          <strong className="text-green-600">one vegetarian</strong> and{" "}
          <strong className="text-orange-600">one vegan</strong>. But one would
          be <strong>wrong!</strong>
        </p>

        {/* ########## Theorem ########## */}

        <p className="mb-2">Introducing the completely made-up theorem: </p>
        <p className="text-xl bg-amber-300 w-fit rounded-md px-2 font-bold mb-2">
          The theorem of everyone loves the 4 cheese
        </p>
        <p>
          That's right! One very common choice for a{" "}
          <strong className="text-green-600">vegetarian</strong> pizza is the 4
          cheese, but <strong className="text-red-600">omnivorous</strong> and{" "}
          <strong className="text-blue-600">pesco-vegetarian</strong> will eat a
          bit of that too.
        </p>
        <p className="mb-2">
          Once the most permissive pizzas in terms of diet are depleted, the
          remaining slices will be exclusive to the most permissive diets.
          Leaving restrictive diets behind.
        </p>
        <p className="mb-5">
          One might have already noted that, in such circumstances, even one
          single pizza with meat will give advantage to{" "}
          <strong className="text-red-600">omnivorous</strong> people. One is
          right, but this problem can be greatly mitigated. We'll see how.
        </p>

        {/* ########## How to use ########## */}

        <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
          But how can this website help me plan a great pizza party?
        </p>
        <p className="mb-2">The website is divided in 3 distincts panels:</p>
        <ul className="list-disc list-inside mb-2">
          <li>
            <b>The People Panel:</b> This panel lets you configure the diets of
            your guests
          </li>
          <li>
            <b>The Pizza Panel:</b> This panel lets you choose which pizza you
            want to order
          </li>
          <li>
            <b>The Result Panel:</b> This panel give you insights on your plan
            and help you decide
          </li>
        </ul>
        <p className="mb-5">We will cover them one by one.</p>

        {/* ########## The People Panel ########## */}

        <div className="mb-5">
          <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
            The People Panel
          </p>
          <p className="mb-2">
            In this panel, you will find four counters that represent how much
            of each diet will be at your party.
          </p>
          <div className="flex mb-2">
            <DietIcon type="normal" color="Color" className="size-6 mr-2" />
            <p>
              Represents <strong className="text-red-600">omnivorous</strong>{" "}
              people
            </p>
          </div>
          <div className="flex mb-2">
            <DietIcon
              type="pescoVegetarian"
              color="Color"
              className="size-6 mr-2"
            />
            <p>
              Represents{" "}
              <strong className="text-blue-600">pesco-vegetarian</strong> people
            </p>
          </div>
          <div className="flex mb-2">
            <DietIcon type="vegetarian" color="Color" className="size-6 mr-2" />
            <p>
              Represents <strong className="text-green-600">vegetarian</strong>{" "}
              people
            </p>
          </div>
          <div className="flex mb-2">
            <DietIcon type="vegan" color="Color" className="size-6 mr-2" />
            <p>
              Represents <strong className="text-orange-600">vegan</strong>{" "}
              people
            </p>
          </div>
          <p className="mb-2">
            You can both use the{" "}
            <Button
              className="inline-flex w-7 rounded-s-lg"
              color="red"
              onClick={() => {}}
            >
              <Minus size={20} strokeWidth={2} />
            </Button>{" "}
            or{" "}
            <Button
              className="inline-flex w-7 rounded-e-lg"
              color="green"
              onClick={() => {}}
            >
              <Plus size={20} strokeWidth={2} />
            </Button>{" "}
            button to change the value or you can directly edit the number with
            the keyboard.
          </p>

          <p>
            At the bottom of the list you can see the total number of people.
          </p>
        </div>

        {/* ########## The Pizza Panel ########## */}

        <div className="mb-5">
          <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
            The Pizza Panel
          </p>
          <p className="mb-2">
            In this panel you will find a table of pizzas described by their
            quantity, name, diet and price. At the bottom of the table is a form
            to add new pizzas to the list.
          </p>
          <p className="mb-4">
            In here you can put what you plan to order, since the quantity can
            be 0 you can also add the whole menu of the pizzeria you are
            ordering from and only then choose which one you want.
          </p>
          <p className="mb-2">
            Let's take a quick look at the diet selector of the form.
          </p>
          <div className="w-40 mb-2">
            <DietSelector tabIndex={0} value={diet} onChange={setDiet} />
          </div>
          <p className="mb-2">
            You can click the symbols to tell how permissive the pizza is. Or
            click once to focus it and press{" "}
            <span className="inline-block size-7 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)] translate-y-1">
              <span className="flex items-center justify-center size-full">
                <ArrowBigLeft size={18} />
              </span>
            </span>{" "}
            or{" "}
            <span className="inline-block size-7 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)] translate-y-1">
              <span className="flex items-center justify-center size-full">
                <ArrowBigRight size={18} />
              </span>
            </span>{" "}
            to control it.
          </p>
          <div className="flex mb-2">
            <DietIcon type="normal" color="Color" className="size-6 mr-2" />
            <p>
              Represents pizza with meat that can therefore only be eaten by{" "}
              <strong className="text-red-600">omnivorous</strong> people
            </p>
          </div>
          <div className="flex mb-2">
            <DietIcon
              type="pescoVegetarian"
              color="Color"
              className="size-6 mr-2"
            />
            <p>
              Represents pizza with fish that can be eaten by{" "}
              <strong className="text-red-600">omnivorous</strong> and{" "}
              <strong className="text-blue-600">pesco-vegetarian</strong> people
            </p>
          </div>
          <div className="flex mb-2">
            <DietIcon type="vegetarian" color="Color" className="size-6 mr-2" />
            <p>
              Represents pizza with cheese or egg that can be eaten by everybody
              except <strong className="text-orange-600">vegan</strong> people
            </p>
          </div>
          <div className="flex mb-2">
            <DietIcon type="vegan" color="Color" className="size-6 mr-2" />
            <p>
              Represents <strong className="text-orange-600">vegan</strong>{" "}
              pizza that can be eaten by everybody
            </p>
          </div>
          <p>
            In the form you can press{" "}
            <span className="inline-block h-7 w-10 px-1 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)]">
              <span className="flex items-center justify-center size-full">
                Tab
              </span>
            </span>{" "}
            to go to the next field.
          </p>
          <p className="mb-4">
            When done filling the fields, you can press{" "}
            <span className="inline-block h-7 w-14 px-1 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)]">
              <span className="flex items-center justify-center size-full">
                Enter
              </span>
            </span>{" "}
            or click{" "}
            <span className="inline-block translate-y-1">
              <Button
                color="green"
                onClick={() => {}}
                className="w-16 rounded-lg"
              >
                <Plus size={20} strokeWidth={2} />
              </Button>
            </span>{" "}
            to add the pizza.
          </p>
          <p>
            If you make a mistake, you can edit it pizzas. To do that there is
            either a button{" "}
            <span className="inline-block translate-y-1">
              <Button
                color="green"
                onClick={() => {}}
                className="w-8 rounded-lg"
              >
                <Pencil size={20} strokeWidth={2} />
              </Button>
            </span>{" "}
            on the right or you can double click any field.
          </p>
          <p className="mb-4">
            Once in edit mode you can edit all fields, you can validate by
            clicking the{" "}
            <span className="inline-block translate-y-1">
              <Button
                color="green"
                onClick={() => {}}
                className="w-8 rounded-lg"
              >
                <Check size={20} strokeWidth={2} />
              </Button>
            </span>{" "}
            button or pressing{" "}
            <span className="inline-block h-7 w-14 px-1 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)]">
              <span className="flex items-center justify-center size-full">
                Enter
              </span>
            </span>
            , or you can cancel by clicking the{" "}
            <span className="inline-block translate-y-1">
              <Button
                color="yellow"
                onClick={() => {}}
                className="w-8 rounded-lg"
              >
                <Undo2 size={20} strokeWidth={2} />
              </Button>
            </span>{" "}
            button or pressing{" "}
            <span className="inline-block h-7 w-20 px-1 bg-gray-100 shadow-[inset_3px_3px_rgb(220,220,220),inset_-3px_-3px_rgb(150,150,150)]">
              <span className="flex items-center justify-center size-full">
                Escape
              </span>
            </span>
            {""}.
          </p>
          <p className="mb-4">
            You can also delete pizzas by clicking on the{" "}
            <span className="inline-block translate-y-1">
              <Button color="red" onClick={() => {}} className="w-8 rounded-lg">
                <Trash2 size={20} strokeWidth={2} />
              </Button>
            </span>{" "}
            button on the right.
          </p>
          <p>
            Once you have your pizza setup, you can choose the quantity on the
            left by hovering it and using the same controls as for the amount of
            people.
          </p>
        </div>

        {/* ########## The Result Panel ########## */}

        <div className="mb-5">
          <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
            The Result Panel
          </p>
          <p className="mb-2">
            In this panel you will find insights about your plan. More
            specifically you will find how much pizza per person you have, how
            much money per person it will cost. And most importantly, whether
            every diet will have a fair share of the pizzas or not.
          </p>
          <p className="mb-2">
            The cost and pizza quantity are represented on the right like this:
          </p>
          <div className="w-64 flex mb-2">
            <div className="text-3xl font-bold mr-2 w-full">
              <div className="mb-2 flex justify-center">
                <img
                  src="/src/assets/Cash.png"
                  className="size-8"
                  alt="Price"
                />
              </div>
              <div className="bg-lime-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
                <span className="text-lg">4€ / pers</span>
                <span className="text-lg">12€ total</span>
              </div>
            </div>
            <div className="text-3xl font-bold w-full">
              <div className="mb-2 flex justify-center">
                <img
                  src="/src/assets/Pizza.png"
                  className="size-8"
                  alt="Quantity"
                />
              </div>
              <div className="bg-amber-400 h-14 rounded-lg w-full min-w-24 flex flex-col items-center justify-center">
                <span className="text-lg">4 slices</span>
                <span className="text-lg">~1/2 pizzas</span>
              </div>
            </div>
          </div>
          <p>
            The slices is the exact number of slices per person, the pizza is an
            approximation with understandable numbers (1/2, 1/4, 7/8) of what it
            represents.
          </p>

          <hr className="my-2 border-black w-[90%] mx-[5%]" />

          <p className="mb-2">
            The fairness for every diet is represented by flag giving
            qualitative results like this:
          </p>
          <div className="flex items-center w-[500px]">
            <div className="h-full mr-2 text-center min-w-32 mb-4">
              <div className="text-3xl font-bold mb-2 flex justify-center">
                <DietIcon
                  type={"vegetarian"}
                  color="Color"
                  className="size-8"
                />
              </div>
              <PizzaFlag flagState={flagStates[flagStateIndex]} />
            </div>
            <p className="translate-y-3">
              {flagStatesDescriptions[flagStateIndex]}
            </p>
          </div>
          <p className="mb-2">
            Overall you should aim for every diet marked as{" "}
            <strong className="text-green-600">Good</strong>,{" "}
            <strong className="text-sky-600">Perfect</strong> is unattainable
            unless you take only pizzas that everyone can eat.
          </p>

          <p>
            On the result panel there are also two element that you can expand:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>
              The details panel shows you what to expect in terms of reparition
              of the food. With numbers this time. There are further explanation
              available by clicking the{" "}
              <Info
                size={20}
                strokeWidth={2}
                color="gray"
                className="inline-block"
              />{" "}
              next to the table.
            </li>
            <li>
              The params panel allow you to choose in how many slices each pizza
              have.
            </li>
          </ul>
        </div>

        {/* ########## Thanks ########## */}

        <div className="mb-5">
          <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
            Conclusion
          </p>
          <p>Thanks for using Pizza Party Maker, have a nice Pizza Party!</p>
        </div>
        <p className="text-gray-600 text-center w-full">
          Created by Bertrand Baudeur
        </p>
      </div>
    </div>
  );
}
