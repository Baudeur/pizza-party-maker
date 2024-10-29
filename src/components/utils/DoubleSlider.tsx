import { useCallback, useRef } from "react";

type DoubleSliderProps = {
  value1: number;
  value2: number;
  onChange: (value1: number, value2: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
};

export function DoubleSlider({
  value1,
  value2,
  onChange,
  min,
  max,
  step,
  className,
}: Readonly<DoubleSliderProps>) {
  const ref = useRef<SVGRectElement>(null);
  const width = 200;
  const height = 20;
  const borderWidth = 1;
  const percentage1 = (value1 - min) / (max - min);
  const percentage2 = (value2 - min) / (max - min);

  const roundStep = useCallback(
    (number: number) => {
      return Math.round(number / step) * step;
    },
    [step]
  );
  const handleMove = useCallback(
    (value: number) => (x: number) => {
      const rect = ref.current?.getBoundingClientRect();
      let percentage = Math.min(Math.max(0, x - (rect?.x ?? 0)), width) / width;
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
    ]
  );

  const listener1 = (ev: MouseEvent) => {
    handleMove(1)(ev.screenX);
  };

  const listener2 = (ev: MouseEvent) => {
    handleMove(2)(ev.screenX);
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
  return (
    <div className={className}>
      <svg width={width} height={height}>
        <rect
          ref={ref}
          x={borderWidth / 2}
          y={height / 3 + borderWidth / 2}
          width={width - borderWidth}
          height={height / 3 - borderWidth}
          fill="rgb(233,233,233)"
          rx={height / 6}
          strokeWidth={borderWidth}
          stroke="rgb(143,143,143)"
        />
        <rect
          x={width * percentage1}
          y={height / 3}
          width={width * (percentage2 - percentage1)}
          height={height / 3}
          fill="rgb(0,167,73)"
          rx={height / 6}
        />
        <rect
          x={width * percentage1}
          y={height / 3 + borderWidth / 2}
          width={width * (percentage2 - percentage1)}
          height={height / 3 - borderWidth}
          fill="rgb(34 197 94)"
          strokeWidth={borderWidth}
          stroke="rgb(0,167,73)"
        />
        <circle
          cx={percentage1 * width}
          cy={height / 2}
          r={height / 2 - borderWidth}
          fill="rgb(34 197 94)"
          strokeWidth={borderWidth * 2}
          stroke="white"
          onMouseDown={handleStartDrag1}
        />
        <circle
          cx={percentage2 * width}
          cy={height / 2}
          r={height / 2 - borderWidth}
          fill="rgb(34 197 94)"
          strokeWidth={borderWidth * 2}
          stroke="white"
          onMouseDown={handleStartDrag2}
        />
      </svg>
    </div>
  );
}
