import { useState } from "react";
import { Button, ButtonColor } from "./Button";

type SelectOption = {
  title: string;
  label: string;
};

type OptionSelectProps = {
  color: ButtonColor;
  options: SelectOption[];
  value: number;
  onSelect: (value: number) => void;
  className?: string;
};

export function OptionSelect({
  color,
  options,
  value,
  onSelect,
  className,
}: OptionSelectProps) {
  const [selected, setSelected] = useState<number>(value);
  return (
    <div className={`flex gap-2 w-full ${className}`}>
      {options.map(({ title, label }, index) => {
        return (
          <Button
            key={label}
            className={`w-full text-lg rounded-lg bg-yellow-200 border-2 border-yellow-400`}
            disabledStyle="disabled:bg-yellow-400"
            disabled={index === selected}
            onClick={() => {
              setSelected(index);
              onSelect(index);
            }}
            color={color}
            title={title}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
