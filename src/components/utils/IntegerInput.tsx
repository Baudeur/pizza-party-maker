import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";

type IntegerInputProps = {
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
  animateShow?: boolean;
  onDelete?: () => void;
};

export function IntegerInput({
  value,
  setValue,
  min = 0,
  max,
  animateShow = true,
  onDelete,
}: IntegerInputProps) {
  function onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = Number(event.target.value);
    if (Number.isNaN(inputValue)) {
      return;
    }
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
    <div className={`h-8 flex rounded-lg justify-center overflow-hidden w-24`}>
      {!onDelete && (
        <Button
          className={`text-lg ${
            animateShow ? "min-w-7 w-7" : "w-0 min-w-0"
          } transition-all ease-out duration-200`}
          color={"red"}
          onClick={() => value != min && setValue(value - 1)}
        >
          <Minus size={20} strokeWidth={2} />
        </Button>
      )}
      {onDelete && (
        <Button
          className={`text-lg ${
            animateShow ? "min-w-7 w-7" : "w-0 min-w-0"
          } transition-all ease-out duration-200`}
          color={"red"}
          onClick={() => (value !== 0 ? setValue(value - 1) : onDelete())}
        >
          {value !== 0 ? (
            <Minus size={20} strokeWidth={2} />
          ) : (
            <Trash2 size={20} strokeWidth={2} />
          )}
        </Button>
      )}
      <input
        type="text"
        value={String(value)}
        onChange={onValueChange}
        className={`h-8 px-2 w-[40px] text-xl text-center font-bold outline-none`}
      />
      <Button
        className={`text-lg ${
          animateShow ? "min-w-7 w-7" : "w-0 min-w-0"
        } transition-all ease-out duration-200`}
        color={"green"}
        onClick={() => {
          if (max !== undefined && value >= max) return;
          setValue(value + 1);
        }}
      >
        <Plus size={20} strokeWidth={2} />
      </Button>
    </div>
  );
}
