import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";

type IntegerInputProps = {
  value: number;
  setValue: (value: number) => void;
  onDelete?: () => void;
};

export function IntegerInput({ value, setValue, onDelete }: IntegerInputProps) {
  function onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = Number(event.target.value);
    if (Number.isNaN(inputValue)) {
      return;
    }
    setValue(inputValue >= 0 ? inputValue : 0);
  }

  return (
    <div className="h-8 flex rounded-lg overflow-hidden w-24">
      {!onDelete && (
        <Button
          className={"text-lg min-w-7"}
          color={"red"}
          onClick={() => value != 0 && setValue(value - 1)}
        >
          <Minus size={20} strokeWidth={2} />
        </Button>
      )}
      {onDelete && (
        <Button
          className={"text-lg min-w-7"}
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
        className={`h-8 px-2 w-full text-xl text-center font-bold outline-none`}
      />
      <Button
        className={"text-lg min-w-7"}
        color={"green"}
        onClick={() => setValue(value + 1)}
      >
        <Plus size={20} strokeWidth={2} />
      </Button>
    </div>
  );
}
