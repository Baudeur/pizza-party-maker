import { useCallback, useRef } from "react";

type FairnessSelectorProps = {
  value1: number;
  value2: number;
  onChange: (value1: number, value2: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
};

const width = 400;
const height = 70;
const borderWidth = 2;
//Height of the space for the label under the graph
const labelSpace = 20;
//Margin on the right for the fade of the bad portion
const badExcess = 40;
//Width of the handle to move change the value
const handeWidth = 15;
//Space Before the graph starts (needed for label no to be cropped)
const marginLeft = 25;

export function FairnessSelector({
  value1,
  value2,
  onChange,
  min,
  max,
  step,
  className,
}: Readonly<FairnessSelectorProps>) {
  const ref = useRef<SVGRectElement>(null);
  const percentage1 = (value1 - min) / (max - min);
  const percentage2 = (value2 - min) / (max - min);
  //Width that we actually take percentages of
  const workingWidth =
    ((width - badExcess - marginLeft - borderWidth * 2) * 19) / 21;
  //Start of the working Width (removing the margin on the left, the border width and the first 5% that enforce the 105%)
  const startX =
    marginLeft +
    borderWidth +
    (width - badExcess - marginLeft - borderWidth * 2) / 21;
  //Height of the graph, without the label
  const graphHeight = height - labelSpace;
  //Are the two labels touching eachother?
  const shouldMerge =
    workingWidth * (percentage2 - percentage1) < labelSpace * 1.2 * 2;

  const roundStep = useCallback(
    (number: number) => {
      return Math.round(number / step) * step;
    },
    [step]
  );
  const handleMove = useCallback(
    (value: number) => (x: number) => {
      const rect = ref.current?.getBoundingClientRect();
      let percentage =
        Math.min(Math.max(0, x - (rect?.x ?? 0)), workingWidth) / workingWidth;
      let func;
      if (value === 1) {
        percentage = Math.min(percentage, percentage2);
        func = (val: number) => {
          onChange(val, value2);
        };
      } else {
        percentage = Math.max(percentage1, percentage);
        func = (val: number) => {
          onChange(value1, val);
        };
      }
      func(roundStep(percentage * (max - min) + min));
    },
    [
      ref,
      max,
      min,
      percentage1,
      percentage2,
      roundStep,
      value1,
      value2,
      onChange,
      workingWidth,
    ]
  );

  const listener1 = (ev: MouseEvent) => {
    handleMove(1)(ev.pageX);
  };

  const listener2 = (ev: MouseEvent) => {
    handleMove(2)(ev.pageX);
  };

  const handleStartDrag1 = () => {
    addEventListener("mousemove", listener1);
  };
  const handleStartDrag2 = () => {
    addEventListener("mousemove", listener2);
  };
  const handleStopDrag = () => {
    removeEventListener("mousemove", listener1);
    removeEventListener("mousemove", listener2);
  };
  addEventListener("mouseup", handleStopDrag);

  const handleClick = (area: string, x: number) => {
    if (area === "good") {
      handleMove(1)(x);
    }
    if (area === "bad") {
      handleMove(2)(x);
    }
    const rect = ref.current?.getBoundingClientRect();
    const percentage =
      Math.min(Math.max(0, x - (rect?.x ?? 0)), workingWidth) / workingWidth;
    if (percentage - percentage1 < percentage2 - percentage) {
      handleMove(1)(x);
    } else {
      handleMove(2)(x);
    }
  };
  return (
    <div className={className} data-testid="fairness-parameter">
      <svg width={width} height={height}>
        {/*Mask for fadout of bad*/}
        <defs>
          <linearGradient id="gradient">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="black" />
          </linearGradient>
          <mask id="fade">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={width - badExcess}
              y="0"
              width={badExcess - borderWidth}
              height={graphHeight}
              fill="url(#gradient)"
            />
            <rect
              x={width - borderWidth}
              width={borderWidth}
              height="100%"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          data-testid="fairness-parameter-move-area"
          ref={ref}
          x={startX}
          width={workingWidth}
          height={graphHeight}
          opacity={0}
        />
        {/*Good*/}
        <rect
          x={borderWidth + marginLeft}
          y={borderWidth}
          width={startX - marginLeft + workingWidth * percentage1}
          height={graphHeight - borderWidth * 2}
          className="fill-green-400"
          strokeWidth={borderWidth}
          stroke="black"
          onClick={(ev) => {
            handleClick("good", ev.pageX);
          }}
        />
        <text
          x={startX}
          y={graphHeight / 2}
          transform={`rotate(-90, ${startX},${graphHeight / 2})`}
          className="font-bold pointer-events-none"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={graphHeight * 0.3}
        >
          Good
        </text>
        {/*Okay*/}
        <rect
          x={startX + workingWidth * percentage1}
          y={borderWidth}
          width={workingWidth * (percentage2 - percentage1)}
          height={graphHeight - borderWidth * 2}
          className="fill-yellow-400"
          strokeWidth={borderWidth}
          stroke="black"
          onClick={(ev) => {
            handleClick("okay", ev.pageX);
          }}
        />
        <text
          x={
            startX +
            workingWidth * percentage1 +
            handeWidth / 2 +
            graphHeight * 0.2
          }
          y={graphHeight / 2}
          transform={`rotate(-90, ${
            startX +
            workingWidth * percentage1 +
            handeWidth / 2 +
            graphHeight * 0.2
          },${graphHeight / 2})`}
          className="font-bold pointer-events-none"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={graphHeight * 0.3}
        >
          Okay
        </text>
        {/*Bad*/}
        <rect
          x={startX + workingWidth * percentage2}
          y={borderWidth}
          width={
            badExcess + workingWidth * (1 - percentage2) + startX - borderWidth
          }
          height={graphHeight - borderWidth * 2}
          className="fill-red-400"
          strokeWidth={borderWidth}
          stroke="black"
          mask="url(#fade)"
          onClick={(ev) => {
            handleClick("bad", ev.pageX);
          }}
        />
        <text
          x={Math.min(
            startX +
              workingWidth * percentage2 +
              graphHeight * 0.2 +
              handeWidth / 2,
            width - startX / 2
          )}
          y={graphHeight / 2}
          transform={`rotate(-90, ${Math.min(
            startX +
              workingWidth * percentage2 +
              graphHeight * 0.2 +
              handeWidth / 2,
            width - startX / 2
          )},${graphHeight / 2})`}
          className="font-bold pointer-events-none"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={graphHeight * 0.3}
        >
          Bad
        </text>
        {/*Cursors*/}
        <rect
          data-testid="fairness-parameter-cursor1"
          className="cursor-ew-resize focus:fill-green-500 fill-gray-400 hover:fill-gray-500"
          x={startX + workingWidth * percentage1 - handeWidth / 2}
          width={handeWidth}
          y={borderWidth / 2}
          rx={handeWidth / 2}
          height={graphHeight - borderWidth}
          strokeWidth={borderWidth}
          stroke="white"
          onMouseDown={handleStartDrag1}
          onKeyDown={(ev) => {
            if (ev.key === "ArrowRight") {
              onChange(Math.min(value1 + 0.05, value2), value2);
            }
            if (ev.key === "ArrowLeft") {
              onChange(Math.max(value1 - 0.05, min), value2);
            }
          }}
          tabIndex={-1}
        />
        <rect
          data-testid="fairness-parameter-cursor2"
          className="cursor-ew-resize focus:fill-green-500 fill-gray-400 hover:fill-gray-500"
          x={startX + workingWidth * percentage2 - handeWidth / 2}
          width={handeWidth}
          y={borderWidth / 2}
          rx={handeWidth / 2}
          height={graphHeight - borderWidth}
          strokeWidth={borderWidth}
          stroke="white"
          onMouseDown={handleStartDrag2}
          onKeyDown={(ev) => {
            if (ev.key === "ArrowRight") {
              onChange(value1, Math.min(value2 + 0.05, max));
            }
            if (ev.key === "ArrowLeft") {
              onChange(value1, Math.max(value2 - 0.05, value1));
            }
          }}
          tabIndex={-1}
        />
        {/*Labels*/}
        {shouldMerge ? (
          <>
            <rect
              x={
                startX +
                (workingWidth * (percentage1 + percentage2)) / 2 -
                labelSpace * 1.2 * (value1 !== value2 ? 2 : 1)
              }
              y={graphHeight + labelSpace * 0.1}
              rx={5}
              width={labelSpace * 1.2 * (value1 !== value2 ? 4 : 2)}
              height={labelSpace * 0.9}
              fill="white"
            />
            <text
              x={startX + (workingWidth * (percentage1 + percentage2)) / 2}
              y={graphHeight + labelSpace * 0.55}
              className="font-bold cursor-vertical-text"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={labelSpace - 5}
            >
              {value1 !== value2
                ? `${Math.round(value1 * 100)}%-${Math.round(value2 * 100)}%`
                : `${Math.round(value1 * 100)}%`}
            </text>
          </>
        ) : (
          <>
            <rect
              x={startX + workingWidth * percentage1 - labelSpace * 1.2}
              y={graphHeight + labelSpace * 0.1}
              rx={5}
              width={labelSpace * 1.2 * 2}
              height={labelSpace * 0.9}
              fill="white"
            />
            <text
              x={startX + workingWidth * percentage1}
              y={graphHeight + labelSpace * 0.55}
              className="font-bold cursor-vertical-text"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={labelSpace - 5}
            >
              {Math.round(value1 * 100)}%
            </text>
            <rect
              x={startX + workingWidth * percentage2 - labelSpace * 1.2}
              y={graphHeight + labelSpace * 0.1}
              rx={5}
              width={labelSpace * 1.2 * 2}
              height={labelSpace * 0.9}
              fill="white"
            />
            <text
              x={startX + workingWidth * percentage2}
              y={graphHeight + labelSpace * 0.55}
              className="font-bold cursor-vertical-text"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={labelSpace - 5}
            >
              {Math.round(value2 * 100)}%
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
