import { PropsWithChildren, useState } from "react";

type ExpandProps = {
  label: string;
  heigth: string;
  className?: string;
};

export function Expand({
  label,
  children,
  heigth,
  className,
}: PropsWithChildren<ExpandProps>) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`h-fit flex flex-col items-start w-full bg-amber-300 rounded-lg ${className}`}
    >
      <div
        className="h-7 w-full text-lg font-bold cursor-pointer text-left mx-2"
        onClick={() => setExpanded(!expanded)}
      >
        {label}
      </div>
      <div
        className={`${
          expanded ? heigth : "h-0"
        } transition-all ease-in-out duration-300 overflow-hidden px-2 w-full`}
      >
        {children}
      </div>
    </div>
  );
}
