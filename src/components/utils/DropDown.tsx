import { ChevronDown } from "lucide-react";
import { useState } from "react";

type DropDownProps<T extends number | string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  onScrollBottom?: () => void;
  className?: string;
};

export function DropDown<T extends number | string>({
  options,
  value,
  onChange,
  onScrollBottom = () => {},
  className,
}: DropDownProps<T>) {
  const [dropDownShown, setDropDownShown] = useState(false);

  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const element = event.target as HTMLDivElement;
    const bottom =
      Math.abs(
        element.scrollHeight - (element.scrollTop + element.clientHeight)
      ) <= 1;
    if (bottom) onScrollBottom();
  }

  return (
    <button
      className={`relative ${className}`}
      onClick={() => setDropDownShown(!dropDownShown)}
      onBlur={() => setDropDownShown(false)}
    >
      <div
        className={`h-[30px] bg-white rounded-lg flex items-center justify-between pr-2 pl-3 cursor-pointer`}
      >
        <div className="text-left">
          {options[options.findIndex((opt) => opt.value === value)].label}
        </div>
        <ChevronDown size={15} className={`${dropDownShown && "rotate-180"}`} />
      </div>
      {dropDownShown && (
        <div
          className="z-10 absolute bg-white w-full rounded-lg overflow-hidden border-gray-200 border-2 shadow-md overflow-y-auto max-h-[150px]"
          onScroll={handleScroll}
        >
          {options.map(({ value: val, label }) => (
            <div
              className="hover:bg-gray-200 text-left pl-3"
              key={label}
              onClick={() => {
                setDropDownShown(false);
                onChange(val);
              }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </button>
  );
}
