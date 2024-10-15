import { People } from "../../modules/people/slice";
import { Diet } from "../../types";
import { DietIcon } from "../icons/DietIcon";

type SquaresProps = {
  proportions: People;
  width: number;
  height: number;
  vertical?: boolean;
  className?: string;
};

export function Squares({
  proportions,
  width,
  height,
  vertical = false,
  className,
}: SquaresProps) {
  const { normal, pescoVegetarian, vegetarian, vegan } = proportions;
  const total = normal + pescoVegetarian + vegetarian + vegan;
  const percentages: Record<Diet, number> = {
    normal: Math.round((normal / total) * 100),
    pescoVegetarian: Math.round((pescoVegetarian / total) * 100),
    vegetarian: Math.round((vegetarian / total) * 100),
    vegan: Math.round((vegan / total) * 100) + 1,
  };
  //Takes an eight of the greatest length but do not go over the lowest one.
  const iconSize =
    Math.min(Math.max(width / 10, height / 10), Math.min(width, height)) - 4;

  function shouldHide(diet: Diet) {
    if (vertical) {
      return iconSize > (height * percentages[diet]) / 100;
    } else {
      return iconSize > (width * percentages[diet]) / 100;
    }
  }
  return (
    <div>
      {total === 0 && (
        <div
          className={`flex flex-col justify-center items-center border-2 border-black bg-gray-100 ${className}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <div
            className={`font-bold`}
            style={{ fontSize: `${Math.min(height / 4, width / 4)}px` }}
          >
            N/A
          </div>
          <div style={{ fontSize: `${Math.min(height / 4, width / 4)}px` }}>
            ❌
          </div>
        </div>
      )}
      {total !== 0 && (
        <div
          className={`flex ${
            vertical ? "flex-col divide-y-2" : "divide-x-2"
          } border-2 border-black divide-black ${className}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          {[
            { label: "normal", color: "bg-red-500" },
            { label: "pescoVegetarian", color: "bg-blue-500" },
            { label: "vegetarian", color: "bg-green-500" },
            { label: "vegan", color: "bg-orange-500" },
          ].map(({ label, color }) => {
            {
              const diet = label as Diet;
              if (percentages[diet] === 0) return null;
              return (
                <div
                  key={diet}
                  className={`flex items-center justify-center ${color} ${
                    diet === "vegan" ? "grow-1" : "grow-0"
                  } h-full`}
                  style={{
                    width: `${vertical ? 100 : percentages[diet]}%`,
                    height: `${vertical ? percentages[diet] : 100}%`,
                  }}
                >
                  <div
                    className={`${shouldHide(diet) ? "hidden" : ""}`}
                    style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                  >
                    <DietIcon type={diet} color="Color" className="size-full" />
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
