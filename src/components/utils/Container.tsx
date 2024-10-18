import { PropsWithChildren } from "react";

export function Container({
  children,
  className,
  testId,
}: PropsWithChildren<{ className?: string; testId?: string }>) {
  return (
    <div
      className={`bg-amber-100 border-amber-400 border-4 rounded-2xl w-fit p-4 ${className}`}
      data-testid={testId}
    >
      {children}
    </div>
  );
}
