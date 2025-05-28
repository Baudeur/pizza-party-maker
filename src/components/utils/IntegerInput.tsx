import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type IntegerInputProps = {
  value: number;
  setValue: (value: number) => void;
  title: string;
  min?: number;
  max?: number;
  animateShow?: boolean;
  rounded?: boolean;
  onDelete?: () => void;
  className?: string;
  testId?: string;
};

export function IntegerInput({
  value,
  setValue,
  title,
  min = 0,
  max = 99,
  animateShow = true,
  rounded = true,
  onDelete,
  className,
  testId,
}: Readonly<IntegerInputProps>) {
  const [focus, setFocus] = useState(false);
  const { t } = useTranslation();

  function onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = Number(event.target.value);
    if (Number.isNaN(inputValue)) {
      return;
    }
    inputValue = Math.floor(inputValue);
    if (inputValue < min) {
      setValue(min);
      return;
    }
    if (max !== undefined && inputValue > max) {
      setValue(max);
      return;
    }
    setValue(inputValue);
  }

  return (
    <div className={`relative ${className} w-24 h-8`}>
      <div
        className="absolute top-0 h-8 w-full"
        data-testid={`${testId}-display`}
      >
        <div className="pt-[2px] font-bold w-24 text-xl ">{value}</div>
      </div>
      <div
        className={`absolute top-0 h-8 flex ${
          rounded && "rounded-lg"
        } justify-center overflow-hidden w-24 ${
          animateShow || focus ? "opacity-100" : "opacity-0"
        } transition-opacity duration-0`}
      >
        {!onDelete && (
          <Button
            className={`text-lg ${
              animateShow || focus ? "min-w-7 w-7" : "min-w-0 w-0"
            } transition-width ease-out duration-200`}
            color="red"
            onClick={() => value != min && setValue(value - 1)}
            tabIndex={-1}
            testId={testId && `${testId}-minus`}
            disabled={value === min}
            title={t("minus-of", { element: title })}
          >
            <Minus size={20} strokeWidth={2} />
          </Button>
        )}
        {onDelete && (
          <Button
            className={`text-lg ${
              animateShow || focus ? "min-w-7 w-7" : "min-w-0 w-0"
            } transition-width ease-out duration-200`}
            color="red"
            onClick={() => (value !== min ? setValue(value - 1) : onDelete())}
            tabIndex={-1}
            testId={testId && `${testId}-${value !== 0 ? "minus" : "delete"}`}
            title={
              value !== min
                ? t("minus-of", { element: title })
                : t("delete-element", { element: title })
            }
          >
            {value !== 0 ? (
              <Minus size={20} strokeWidth={2} />
            ) : (
              <Trash2 size={20} strokeWidth={2} />
            )}
          </Button>
        )}
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type="text"
          value={String(value)}
          onChange={onValueChange}
          className={`h-8 px-2 w-[40px] text-xl text-center font-bold outline-none`}
          data-testid={testId && `${testId}-input`}
          title={t("quantity-of", { element: title })}
        />
        <Button
          className={`text-lg ${
            animateShow || focus ? "min-w-7 w-7" : "w-0 min-w-0"
          } transition-width ease-out duration-200`}
          color="green"
          onClick={() => {
            if (max !== undefined && value >= max) return;
            setValue(value + 1);
          }}
          tabIndex={-1}
          testId={testId && `${testId}-plus`}
          disabled={value === max}
          title={t("plus-of", { element: title })}
        >
          <Plus size={20} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
