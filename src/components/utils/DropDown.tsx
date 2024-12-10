import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

type DropDownProps<T extends number | string> = {
  options: { value: T; label: string; disabled?: boolean; icon?: ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  onScrollBottom?: () => void;
  className?: string;
  testId?: string;
  minimal?: boolean;
};

export function DropDown<T extends number | string>({
  options,
  value,
  onChange,
  onScrollBottom = () => {},
  className,
  testId,
  minimal = false,
}: Readonly<DropDownProps<T>>) {
  const [dropDownShown, setDropDownShown] = useState(false);

  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const element = event.target as HTMLDivElement;
    const bottom =
      Math.abs(
        element.scrollHeight - (element.scrollTop + element.clientHeight)
      ) <= 1;
    if (bottom) onScrollBottom();
  }

  const selectedOption =
    options[options.findIndex((opt) => opt.value === value)];

  return (
    <button
      className={`relative ${className}`}
      onClick={() => setDropDownShown(!dropDownShown)}
      onBlur={() => setDropDownShown(false)}
      data-testid={testId && `${testId}-button`}
    >
      <div
        className={`h-[30px] ${
          selectedOption.icon ? "hover:brightness-[80%]" : "hover:brightness-95"
        } ${
          !minimal && "bg-white pr-2 pl-3"
        } rounded-lg flex items-center justify-between cursor-pointer`}
      >
        <div className="text-left">
          {selectedOption.icon ? selectedOption.icon : selectedOption.label}
        </div>
        {!minimal && (
          <ChevronDown
            size={15}
            className={`transition-all ${dropDownShown && "-rotate-180"}`}
          />
        )}
      </div>
      {dropDownShown && (
        <div
          className={`z-20 absolute bg-white min-w-full rounded-lg overflow-hidden border-gray-200 border-2 shadow-md overflow-y-auto max-h-[150px] ${
            minimal && "-left-[14px]"
          }`}
          onScroll={handleScroll}
        >
          {options.map(({ value: val, label, disabled = false, icon }) => (
            <div
              className={`flex items-center gap-1 ${
                disabled ? "text-gray-400 grayscale" : "hover:bg-gray-200"
              } text-left px-3 min-w-full`}
              key={label}
              onClick={() => {
                if (disabled) return;
                onChange(val);
                setDropDownShown(false);
              }}
              onKeyDown={() => {
                onChange(val);
                setDropDownShown(false);
              }}
              data-testid={testId && `${testId}-${val}-option`}
            >
              {icon}
              {label}
            </div>
          ))}
        </div>
      )}
    </button>
  );
}
