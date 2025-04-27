import { PropsWithChildren, ReactNode, useCallback, useState } from "react";
import { Button, ButtonColor } from "./Button";
import { Check } from "lucide-react";

type ButtonProps = {
  className?: string;
  color: ButtonColor;
  onClick: () => void;
  title: string;
  tabIndex?: number;
  disabled?: boolean;
  testId?: string;
  confirmationIcon?: ReactNode;
};

export function NoVisibleEffectButton({
  className,
  color,
  onClick,
  children,
  tabIndex,
  disabled,
  testId,
  title,
  confirmationIcon = <Check size={20} strokeWidth={2} />,
}: PropsWithChildren<ButtonProps>) {
  const [animating, setAnimating] = useState(false);

  const handleClickAndAnimate = useCallback(() => {
    onClick();
    setAnimating(true);
    setTimeout(() => setAnimating(false), 1000);
  }, [onClick]);

  return (
    <Button
      className={`${className}`}
      color={color}
      onClick={handleClickAndAnimate}
      tabIndex={tabIndex}
      disabled={disabled || animating}
      disabledStyle="disabled:brightness-[80%]"
      testId={testId}
      title={title}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div
          className={`absolute -translate-y-7 ${
            animating && "goingDownTwoStepsFirstElement"
          }`}
        >
          {confirmationIcon}
        </div>
        <div
          className={`absolute ${
            animating && "goingDownTwoStepsSecondElement"
          }`}
        >
          {children}
        </div>
      </div>
    </Button>
  );
}
