import { PropsWithChildren, useState } from "react";
import { Button } from "./Button";

type ButtonProps = {
  className?: string;
  color: "green" | "red" | "yellow";
  onClick: () => void;
  animation?: string;
  tabIndex?: number;
  disabled?: boolean;
  testId?: string;
  title?: string;
};

const animeMap = new Map<string, string[]>();
animeMap.set("rotate", [
  "duration-300 rotate-[360deg] scale-0",
  "duration-0 rotate-0 scale-100",
]);
animeMap.set("jump", [
  "duration-150 ease-out scale-x-50 scale-y-150 -translate-y-2",
  "duration-150 ease-in scale-100",
]);
const animeTimeMap = new Map<string, number>();
animeTimeMap.set("rotate", 400);
animeTimeMap.set("jump", 150);

export function NoVisibleEffectButton({
  className,
  color,
  onClick,
  animation = "rotate",
  children,
  tabIndex,
  disabled,
  testId,
  title,
}: PropsWithChildren<ButtonProps>) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    onClick();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), animeTimeMap.get(animation));
  };
  const animations = animeMap.get(animation) ?? ["", ""];
  return (
    <Button
      className={`${className} ${
        isClicked ? "brightness-90 active:brightness-90" : ""
      }`}
      color={color}
      onClick={handleClick}
      tabIndex={tabIndex}
      disabled={isClicked || disabled}
      testId={testId}
      title={title}
    >
      <div
        className={`transition-allsize-8 flex items-center justify-center ease-linear ${
          isClicked ? animations[0] : animations[1]
        }`}
      >
        {children}
      </div>
    </Button>
  );
}
