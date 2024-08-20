import { PropsWithChildren } from "react";

type ButtonProps = {
  className?: string;
  color: "green" | "red";
  onClick: () => void;
  tabIndex?: number;
};

export function Button({
  className,
  color,
  onClick,
  children,
  tabIndex,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      tabIndex={tabIndex}
      className={`h-8 flex justify-center items-center ${className} ${
        color === "red" ? "bg-red-500" : "bg-green-500"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
