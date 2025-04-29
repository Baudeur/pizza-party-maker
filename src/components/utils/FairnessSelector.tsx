import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { desktopSize } from "../../services/constants";

type FairnessSelectorProps = {
  value1: number;
  value2: number;
  onValue1Change: (value1: number) => void;
  onValue2Change: (value2: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
};

//Height of the whole component
const height = 70;
const borderWidth = 2;
//Height of the space for the label under the graph
const labelSpace = 20;
//Margin on the right for the fade of the bad portion
const badExcess = 40;
//Space Before the graph starts (needed for label not to be cropped)
const marginLeft = 25;

export function FairnessSelector({
  value1,
  value2,
  onValue1Change,
  onValue2Change,
  min,
  max,
  step,
  className,
}: Readonly<FairnessSelectorProps>) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const ref = useRef<SVGRectElement>(null);
  const isDesktop = useMediaQuery({ minWidth: desktopSize });
  const [dragged, setDragged] = useState(0);
  //Width of the whole component
  const width = isDesktop ? 400 : 280;
  //Width of the handle to move change the value
  const handleWidth = isDesktop ? 15 : 20;

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
          onValue1Change(val);
        };
      } else {
        percentage = Math.max(percentage1, percentage);
        func = (val: number) => {
          onValue2Change(val);
        };
      }
      func(roundStep(percentage * (max - min) + min));
    },
    [ref, max, min, step, onValue1Change, onValue2Change]
  );

  const listener1 = useCallback(
    (ev: MouseEvent) => {
      handleMove(1)(ev.pageX);
    },
    [handleMove]
  );

  const listener2 = useCallback(
    (ev: MouseEvent) => {
      handleMove(2)(ev.pageX);
    },
    [handleMove]
  );

  const handleStopDrag = useCallback(
    (ev: MouseEvent) => {
      setDragged(0);
      removeEventListener("pointermove", listener1);
      removeEventListener("pointermove", listener2);
      removeEventListener("pointerup", handleStopDrag);
      removeEventListener("click", handleStopDrag, true);
      ev.preventDefault();
      ev.stopPropagation();
    },
    [listener1, listener2]
  );

  //Exist so the don't exit the overlay if we mouseup in the background
  const handleClickBlock = useCallback((ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    removeEventListener("click", handleClickBlock, true);
  }, []);

  const handleStartDrag1 = () => {
    setDragged(1);
    addEventListener("pointermove", listener1);
    addEventListener("pointerup", handleStopDrag);
    addEventListener("click", handleClickBlock, true);
  };
  const handleStartDrag2 = () => {
    setDragged(2);
    addEventListener("pointermove", listener2);
    addEventListener("pointerup", handleStopDrag);
    addEventListener("click", handleClickBlock, true);
  };

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
    <div
      className={`${className} ${!isDesktop && "touch-none"}`}
      data-testid="fairness-parameter"
    >
      <svg width={width} height={height}>
        <title>{t("suggester-unfairness-description")}</title>
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
          {t("pizza-flag-good")}
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
            handleWidth / 2 +
            graphHeight * 0.2
          }
          y={graphHeight / 2}
          transform={`rotate(-90, ${
            startX +
            workingWidth * percentage1 +
            handleWidth / 2 +
            graphHeight * 0.2
          },${graphHeight / 2})`}
          className="font-bold pointer-events-none"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={graphHeight * (language === "en" ? 0.3 : 0.25)}
        >
          {t("pizza-flag-okay")}
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
              handleWidth / 2,
            width - startX / 2
          )}
          y={graphHeight / 2}
          transform={`rotate(-90, ${Math.min(
            startX +
              workingWidth * percentage2 +
              graphHeight * 0.2 +
              handleWidth / 2,
            width - startX / 2
          )},${graphHeight / 2})`}
          className="font-bold pointer-events-none"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={graphHeight * (language === "en" ? 0.3 : 0.2)}
        >
          {t("pizza-flag-bad")}
        </text>
        {/*Cursors*/}
        <rect
          data-testid="fairness-parameter-cursor1"
          className={`cursor-ew-resize fill-gray-400 hover:fill-gray-500 ${
            isDesktop
              ? "focus:fill-green-500"
              : dragged === 1 && "fill-green-500"
          }`}
          x={startX + workingWidth * percentage1 - handleWidth / 2}
          width={handleWidth}
          y={borderWidth / 2}
          rx={isDesktop ? handleWidth / 2 : handleWidth / 4}
          height={graphHeight - borderWidth}
          strokeWidth={borderWidth}
          stroke="white"
          onPointerDown={handleStartDrag1}
          onKeyDown={(ev) => {
            if (ev.key === "ArrowRight") {
              onValue1Change(Math.min(value1 + 0.05, value2));
            }
            if (ev.key === "ArrowLeft") {
              onValue1Change(Math.max(value1 - 0.05, min));
            }
          }}
          tabIndex={-1}
        />
        <rect
          data-testid="fairness-parameter-cursor2"
          className={`cursor-ew-resize fill-gray-400 hover:fill-gray-500 ${
            isDesktop
              ? "focus:fill-green-500"
              : dragged === 2 && "fill-green-500"
          }`}
          x={startX + workingWidth * percentage2 - handleWidth / 2}
          width={handleWidth}
          y={borderWidth / 2}
          rx={isDesktop ? handleWidth / 2 : handleWidth / 4}
          height={graphHeight - borderWidth}
          strokeWidth={borderWidth}
          stroke="white"
          onPointerDown={handleStartDrag2}
          onKeyDown={(ev) => {
            if (ev.key === "ArrowRight") {
              onValue2Change(Math.min(value2 + 0.05, max));
            }
            if (ev.key === "ArrowLeft") {
              onValue2Change(Math.max(value2 - 0.05, value1));
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
