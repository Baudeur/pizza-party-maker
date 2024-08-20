import { Minus, Plus } from "lucide-react";
import { Button } from "./Button";

type IntegerInputProps = {
  value: number;
  setValue: (value: number) => void;
};

export function IntegerInput({ value, setValue }: IntegerInputProps) {
  function onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = Number(event.target.value);
    if (Number.isNaN(inputValue)) {
      return;
    }
    setValue(inputValue >= 0 ? inputValue : 0);
  }

  return (
    <div className="h-8 flex rounded-lg overflow-hidden">
      <Button
        className={"text-lg w-7"}
        color={"red"}
        onClick={() => value != 0 && setValue(value - 1)}
      >
        <Minus size={20} strokeWidth={2} />
      </Button>
      <input
        type="text"
        value={String(value)}
        onChange={onValueChange}
        className={`h-8 pl-2 pr-2 w-[40px] text-xl text-center font-bold outline-none`}
      />
      <Button
        className={"text-lg w-7"}
        color={"green"}
        onClick={() => setValue(value + 1)}
      >
        <Plus size={20} strokeWidth={2} />
      </Button>
    </div>
  );
}
