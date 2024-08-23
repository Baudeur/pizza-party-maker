import { CaseScenario } from "./CaseScenario";

export function CaseScenarioOverlayContent() {
  return (
    <div className="w-[700px] text-left overflow-y-auto h-[80vh]">
      {/* ########## The detail panel ########## */}

      <div className="mb-5">
        <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
          The details panel
        </p>
        <p className="mb-2">
          This panel shows the underlying mechanism of the website. As well as
          giving a bit more information than just the flags
        </p>
        <p className="mb-2">
          This panel shows the results of different simulations of your party.
        </p>
        <p>
          Each simulation result is presented in form of a line that show how
          much slices in average each person of each diet get like so:
        </p>
        <div className="text-center">
          <CaseScenario
            peopleAte={{
              normal: 8,
              pescoVegetarian: 6,
              vegetarian: 6,
              vegan: 7,
            }}
            label="Example"
          />
        </div>
        <p className="mb-2">
          So here we know that each{" "}
          <strong className="text-red-500">omnivorous</strong> ate 8 slices of
          pizza, each{" "}
          <strong className="text-blue-500">pesco-vegetarian</strong> and{" "}
          <strong className="text-green-500">vegetarian</strong> ate 6 slices
          and each <strong className="text-orange-500">vegan</strong> ate 7
          slices.
        </p>

        <p>
          There are 4 different case scenario. The differences are explained
          below.
        </p>
      </div>

      {/* ########## How is it calculated ########## */}

      <div className="mb-4">
        <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
          How are those processed?
        </p>

        <p>
          A case scenario takes all the pizza and people you added and perform
          the following calculation:
        </p>

        <p className="mb-4">
          We proceed by round where everybody will have one slice. The order in
          which people go and the targeted pizzas depends on the scenario type.
        </p>

        <ul className="list-disc list-inside mb-2">
          <li>
            The worst case scenario: In this scenario, each diet will first
            target the pizza that are the less exclusive to them. For example,{" "}
            <strong className="text-red-500">omnivorous</strong> will first eat
            the <strong className="text-orange-500">vegan</strong> pizza, then
            the <strong className="text-green-500">vegetarian</strong> ones,
            then the <strong className="text-blue-500">pesco-vegetarian</strong>{" "}
            ones and only then will they start eating the{" "}
            <strong className="text-red-500">pizzas with meat</strong>.
          </li>
          <li>
            The best case scenario: It's the opposite of the worst case
            scenario, each diet will first target the pizza that correspond to
            their diet.
          </li>
          <li>
            The random case scenario: Each diet will pick a random slice among
            all the pizzas they can eat.
          </li>
          <li>
            The average case scenario: This one is just a random case scenario
            repeated 100 times and we take the average of each result.
          </li>
        </ul>
        <p>
          For the worst and best case scenario, in each round, the{" "}
          <strong className="text-orange-500">vegan</strong> goes first, then
          the <strong className="text-green-500">vegetarian</strong>, then the{" "}
          <strong className="text-blue-500">pesco-vegetarian</strong>, and
          finally the <strong className="text-red-500">omnivorous</strong>.
        </p>
        <p className="mb-2">
          This choice is deliberate, it is there to take into account the fact
          in reality, everybody goes at the same time roughly and if there are
          fights over a unique slice, the most restricitve diet will probably
          have it.
        </p>
        <p className="mb-4">
          In the random and average case scenario, the order in which everybody
          goes is random.
        </p>
        <p>
          The results are rounded up to one decimal number, which can lead to a
          total slices eaten displayed not matching the actual total.
        </p>
      </div>

      {/* ########## How is it calculated ########## */}

      <div>
        <p className="text-xl bg-amber-300 rounded-lg px-2 w-fit font-bold mb-2">
          So what are the flags about?
        </p>
        <p className="mb-2">
          The flags are based on the average case scenario, which I consider
          being the most realistic one.
        </p>
        <p className="mb-2">
          The fairness based the percentage of extra pizza the diet that eats
          most have. In our example above, each{" "}
          <strong className="text-red-500">omnivorous</strong> ate the most with
          8 slices of pizza and{" "}
          <strong className="text-green-500">vegetarian</strong> ate 6 slices.
          Which means <strong className="text-red-500">omnivorous</strong> had
          33% more pizzas than the{" "}
          <strong className="text-green-500">vegetarian</strong>.
        </p>
        <p>
          The flag is <strong className="text-sky-600">Perfect</strong> if this
          percentage is <strong>exactly 0%</strong>. It is{" "}
          <strong className="text-green-600">Good</strong> if this percentage is
          between <strong>between 0% and 25%</strong>. It is{" "}
          <strong className="text-yellow-600">Okay</strong> if this percentage
          is <strong>between 25% and 50%</strong>. And{" "}
          <strong className="text-red-600">Bad</strong> if this percentage is{" "}
          <strong>above 50%</strong>.
        </p>
      </div>
    </div>
  );
}
