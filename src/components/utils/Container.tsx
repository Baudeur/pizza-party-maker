import { PropsWithChildren, ReactNode } from "react";

export function Container({
  children,
  className,
  testId,
  header,
}: PropsWithChildren<{
  className?: string;
  testId?: string;
  header?: ReactNode;
}>) {
  return (
    <div
      className={`bg-amber-100 border-amber-400 border-4 rounded-2xl ${className}`}
      data-testid={testId}
    >
      {header && <div className="w-full rounded-t-xl">{header}</div>}
      <div className={`w-full px-4 pb-4 ${header ? "" : "pt-4"}`}>
        {children}
      </div>
    </div>
  );
}
