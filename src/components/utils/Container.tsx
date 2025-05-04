import { PropsWithChildren, ReactNode } from "react";

type ContainerProps = {
  className?: string;
  testId?: string;
  header?: ReactNode;
  fullHeight?: boolean;
};

export function Container({
  children,
  className,
  testId,
  header,
  fullHeight = false,
}: PropsWithChildren<ContainerProps>) {
  return (
    <div
      className={`bg-amber-100 border-amber-400 border-4 rounded-2xl ${className} ${
        fullHeight && "h-full"
      }`}
      data-testid={testId}
    >
      {header && <div className="w-full rounded-t-xl">{header}</div>}
      <div
        className={`w-full px-4 pb-4 ${header ? "" : "pt-4"} ${
          fullHeight && "h-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
