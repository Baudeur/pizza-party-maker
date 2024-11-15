import { PropsWithChildren } from "react";

type ButtonProps = {
  className?: string;
  color: "green" | "red" | "yellow";
  onClick: () => void;
  tabIndex?: number;
  disabled?: boolean;
  disabledStyle?: string;
  testId?: string;
  title?: string;
};

export function Button({
  className,
  color,
  onClick,
  children,
  tabIndex,
  disabled,
  disabledStyle = "disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:brightness-100",
  testId,
  title,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      tabIndex={tabIndex}
      className={`${className} hover:brightness-90 active:brightness-[80%] h-8 flex justify-center items-center ${disabledStyle} ${
        color === "red" && "bg-red-500"
      } ${color === "green" && "bg-green-500"} ${
        color === "yellow" && "bg-yellow-500"
      }`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      title={title}
    >
      {children}
    </button>
  );
}
