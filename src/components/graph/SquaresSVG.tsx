import { People } from "../../modules/people/slice";
import { Diet, diets } from "../../types";

type SquaresProps = {
  proportions: People;
  width: number;
  height: number;
  className?: string;
};

const borderWidth = 2;

export function SquaresSVG({
  proportions,
  width,
  height,
  className,
}: Readonly<SquaresProps>) {
  const total =
    proportions.normal +
    proportions.pescoVegetarian +
    proportions.vegetarian +
    proportions.vegan;
  const limits = [0];
  const presentDiets: Diet[] = [];
  if (total !== 0) {
    for (const diet of diets) {
      if (proportions[diet] !== 0) {
        presentDiets.push(diet);
        limits.push(proportions[diet] / total + limits[limits.length - 1]);
      }
    }
    limits[limits.length - 1] = 1;
  }
  const coords = limits.map((elem) =>
    Math.round(elem * (width - borderWidth) + borderWidth / 2)
  );
  //Takes a tenth of the greatest length but do not go over the lowest one.
  const iconSize =
    Math.min(Math.max(width / 10, height / 10), Math.min(width, height)) -
    borderWidth * 2;
  return (
    <div className={`${className}`}>
      <svg width={width} height={height}>
        <rect height={height} width={width} />
        {total !== 0 && (
          <>
            {presentDiets.map((diet, index) => {
              return (
                <rect
                  key={diet}
                  x={coords[index]}
                  width={coords[index + 1] - coords[index]}
                  y={borderWidth}
                  height={height - borderWidth * 2}
                  fill={colorOfDiet(diet)}
                />
              );
            })}
            {coords.map((coord) => {
              return (
                <line
                  key={coord}
                  x1={coord}
                  y1={0}
                  x2={coord}
                  y2={height}
                  stroke={"black"}
                  strokeWidth={borderWidth}
                />
              );
            })}
            {presentDiets.map((diet, index) => {
              if (coords[index + 1] - coords[index] - borderWidth < iconSize)
                return null;
              return (
                <image
                  key={diet}
                  href={imageOfDiet(diet)}
                  width={iconSize}
                  x={(coords[index + 1] + coords[index] - iconSize) / 2}
                  y={(height - iconSize) / 2}
                />
              );
            })}
          </>
        )}
        {total === 0 && (
          <>
            <rect
              height={height - 4}
              width={width - 4}
              x={2}
              y={2}
              fill="#DDDDDD"
            />
            <text
              x={width / 2}
              y={height / 2}
              className="font-bold"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={height * 0.4}
            >
              N/A
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

function colorOfDiet(diet: Diet) {
  switch (diet) {
    case "normal":
      return "#EF4444";
    case "pescoVegetarian":
      return "#3B82F6";
    case "vegetarian":
      return "#22C55E";
    case "vegan":
      return "#F97316";
  }
}

function imageOfDiet(diet: Diet) {
  switch (diet) {
    case "normal":
      return "src/assets/Meat.png";
    case "pescoVegetarian":
      return "src/assets/Fish.png";
    case "vegetarian":
      return "src/assets/Cheese.png";
    case "vegan":
      return "src/assets/Carrot.png";
  }
}
