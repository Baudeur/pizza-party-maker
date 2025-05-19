import { PropsWithChildren, ReactNode } from "react";

type ContainerProps = {
  layoutClassName?: string;
  styleClassName?: string;
  testId?: string;
  header?: ReactNode;
  fullHeight?: boolean;
};

export function Container({
  children,
  layoutClassName,
  styleClassName,
  testId,
  header,
  fullHeight = false,
}: PropsWithChildren<ContainerProps>) {
  return (
    <div
      className={`${layoutClassName} ${fullHeight && "h-full"}`}
      data-testid={testId}
    >
      {header && <div className="w-full rounded-t-xl">{header}</div>}
      <div
        className={`${styleClassName} w-full px-4 py-4 bg-amber-100 border-amber-400 border-4 rounded-2xl h-full ${
          header ? "border-t-0 rounded-t-none" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
