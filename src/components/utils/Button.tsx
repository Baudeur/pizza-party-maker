import { PropsWithChildren } from "react";

type ButtonProps = {
  className?: string;
  color: "green" | "red" | "yellow";
  onClick: () => void;
  tabIndex?: number;
  disabled?: boolean;
};

export function Button({
  className,
  color,
  onClick,
  children,
  tabIndex,
  disabled,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      tabIndex={tabIndex}
      className={`hover:brightness-90 active:brightness-[80%] h-8 flex justify-center items-center ${className} ${
        color === "red" && "bg-red-500"
      } ${color === "green" && "bg-green-500"} ${
        color === "yellow" && "bg-yellow-500"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
