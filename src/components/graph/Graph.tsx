import { People } from "../../modules/people/slice";
import { DietIcon } from "../icons/DietIcon";

type GraphProps = {
  proportions: People;
  className?: string;
  size: number;
};

export function Graph({ proportions, className, size }: GraphProps) {
  const { normal, pescoVegetarian, vegetarian, vegan } = proportions;
  const total = normal + pescoVegetarian + vegetarian + vegan;
  const degs = {
    normal: (normal / total) * 360,
    pescoVegetarian: (pescoVegetarian / total) * 360,
    vegetarian: (vegetarian / total) * 360,
    vegan: (vegan / total) * 360,
  };
  const cumulative = [
    degs.normal,
    degs.normal + degs.pescoVegetarian,
    degs.normal + degs.pescoVegetarian + degs.vegetarian,
  ];

  const borderWidth = Math.ceil(size / 50 / 2) * 2;
  const newSize = size + borderWidth * 2;

  function ShiftCoords({ x, y }: { x: number; y: number }) {
    return { x: x + size / 2, y: y + size / 2 };
  }

  function enlargeCoords({ x, y }: { x: number; y: number }) {
    return { x: x * size * 0.4, y: y * size * 0.4 };
  }

  function getCoords(deg: number) {
    return {
      x: Math.sin(((deg - 90) * Math.PI) / 180),
      y: Math.cos(((deg - 90) * Math.PI) / 180),
    };
  }

  const positions = [
    ShiftCoords(enlargeCoords(getCoords(cumulative[0] / 2))),
    ShiftCoords(enlargeCoords(getCoords((cumulative[0] + cumulative[1]) / 2))),
    ShiftCoords(enlargeCoords(getCoords((cumulative[1] + cumulative[2]) / 2))),
    ShiftCoords(enlargeCoords(getCoords((cumulative[2] + 360) / 2))),
  ];

  return (
    <div>
      {total === 0 && (
        <div
          className={`relative font-bold flex items-center justify-center rounded-full border-black bg-gray-200 ${className}`}
          style={{
            width: `${newSize}px`,
            height: `${newSize}px`,
            borderWidth: borderWidth,
          }}
        >
          N/A
        </div>
      )}
      {total !== 0 && (
        <div
          className={`relative flex items-center justify-end rounded-full border-black ${className}`}
          style={{
            background: `conic-gradient(rgb(239 68 68) ${cumulative[0]}deg, rgb(59 130 246) ${cumulative[0]}deg ${cumulative[1]}deg, rgb(34 197 94) ${cumulative[1]}deg ${cumulative[2]}deg, rgb(249 115 22) ${cumulative[2]}deg)`,
            width: `${newSize}px`,
            height: `${newSize}px`,
            borderWidth: borderWidth,
          }}
        >
          <div
            className="absolute bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: borderWidth, height: borderWidth }}
          ></div>
          <hr
            className="absolute w-1/2 border-black bg-black origin-left -rotate-90"
            style={{ borderWidth: borderWidth / 2 }}
          />
          <hr
            className="absolute w-1/2 border-black bg-black origin-left"
            style={{
              transform: `rotate(${cumulative[0] - 90}deg)`,
              borderWidth: borderWidth / 2,
            }}
          />
          <hr
            className="absolute w-1/2 border-black bg-black origin-left"
            style={{
              transform: `rotate(${cumulative[1] - 90}deg)`,
              borderWidth: borderWidth / 2,
            }}
          />
          <hr
            className="absolute w-1/2 border-black bg-black  origin-left"
            style={{
              transform: `rotate(${cumulative[2] - 90}deg)`,
              borderWidth: borderWidth / 2,
            }}
          />
          {normal !== 0 && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 size-6"
              style={{
                top: `${positions[0].x}px`,
                left: `${positions[0].y}px`,
                width: `${size / 8}px`,
                height: `${size / 8}px`,
              }}
            >
              <DietIcon type={"normal"} color="Color" />
            </div>
          )}
          {pescoVegetarian !== 0 && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${positions[1].x}px`,
                left: `${positions[1].y}px`,
                width: `${size / 8}px`,
                height: `${size / 8}px`,
              }}
            >
              <DietIcon type={"pescoVegetarian"} color="Color" />
            </div>
          )}
          {vegetarian !== 0 && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${positions[2].x}px`,
                left: `${positions[2].y}px`,
                width: `${size / 8}px`,
                height: `${size / 8}px`,
              }}
            >
              <DietIcon type={"vegetarian"} color="Color" />
            </div>
          )}
          {vegan !== 0 && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${positions[3].x}px`,
                left: `${positions[3].y}px`,
                width: `${size / 8}px`,
                height: `${size / 8}px`,
              }}
            >
              <DietIcon type={"vegan"} color="Color" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
