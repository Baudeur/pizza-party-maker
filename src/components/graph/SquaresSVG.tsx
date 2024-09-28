import { People } from "../../modules/people/slice";
import { Diet, diets } from "../../types";

type SquaresProps = {
  proportions: People;
  width: number;
  height: number;
  className?: string;
};

export function SquaresSVG({
  proportions,
  width,
  height,
  className,
}: SquaresProps) {
  const { normal, pescoVegetarian, vegetarian, vegan } = proportions;
  const total = normal + pescoVegetarian + vegetarian + vegan;
  const percentages: Record<Diet, number> = {
    normal: Math.round((normal / total) * (width - 2)),
    pescoVegetarian: Math.round(
      ((pescoVegetarian + normal) / total) * (width - 2)
    ),
    vegetarian: Math.round(
      ((vegetarian + pescoVegetarian + normal) / total) * (width - 2)
    ),
    vegan: width - 1,
  };
  //Takes a tenth of the greatest length but do not go over the lowest one.
  const iconSize =
    Math.min(Math.max(width / 10, height / 10), Math.min(width, height)) - 4;
  return (
    <div className={`${className}`}>
      <svg width={width} height={height}>
        <rect height={height} width={width} />
        <rect
          height={height - 4}
          width={width - 4}
          x={2}
          y={2}
          fill="#FFFFFF"
        />
        <rect
          height={height - 4}
          width={percentages.normal}
          x={1}
          y={2}
          fill="#EF4444"
        />
        <rect
          height={height - 4}
          width={percentages.pescoVegetarian - percentages.normal}
          x={percentages.normal}
          y={2}
          fill="#3B82F6"
        />
        <rect
          height={height - 4}
          width={percentages.vegetarian - percentages.pescoVegetarian}
          x={percentages.pescoVegetarian}
          y={2}
          fill="#22C55E"
        />
        <rect
          height={height - 4}
          width={percentages.vegan - percentages.vegetarian}
          x={percentages.vegetarian}
          y={2}
          fill="#F97316"
        />
        <line
          x1={1}
          y1={0}
          x2={1}
          y2={height}
          stroke={"black"}
          strokeWidth={2}
        />
        <line
          x1={percentages.normal}
          y1={0}
          x2={percentages.normal}
          y2={height}
          stroke={"black"}
          strokeWidth={2}
        />
        <line
          x1={percentages.pescoVegetarian}
          y1={0}
          x2={percentages.pescoVegetarian}
          y2={height}
          stroke={"black"}
          strokeWidth={2}
        />
        <line
          x1={percentages.vegetarian}
          y1={0}
          x2={percentages.vegetarian}
          y2={height}
          stroke={"black"}
          strokeWidth={2}
        />
        <line
          x1={percentages.vegan}
          y1={0}
          x2={percentages.vegan}
          y2={height}
          stroke={"black"}
          strokeWidth={2}
        />
        <image
          href={"src/assets/Carrot.png"}
          width={iconSize}
          x={(percentages.vegan + percentages.vegetarian - iconSize) / 2}
          y={(height - iconSize) / 2}
          opacity={
            percentages.vegan - percentages.vegetarian - 1 < iconSize ? 0 : 1
          }
        />
        <image
          href={"src/assets/Cheese.png"}
          width={iconSize}
          x={
            (percentages.vegetarian + percentages.pescoVegetarian - iconSize) /
            2
          }
          y={(height - iconSize) / 2}
          opacity={
            percentages.vegetarian - percentages.pescoVegetarian - 2 < iconSize
              ? 0
              : 1
          }
        />
        <image
          href={"src/assets/Fish.png"}
          width={iconSize}
          x={(percentages.pescoVegetarian + percentages.normal - iconSize) / 2}
          y={(height - iconSize) / 2}
          opacity={
            percentages.pescoVegetarian - percentages.normal - 2 < iconSize
              ? 0
              : 1
          }
        />
        <image
          href={"src/assets/Meat.png"}
          width={iconSize}
          x={(percentages.normal + 1 - iconSize) / 2}
          y={(height - iconSize) / 2}
          opacity={percentages.normal - 2 < iconSize ? 0 : 1}
        />
      </svg>
    </div>
  );
}
