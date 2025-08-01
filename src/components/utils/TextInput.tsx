import { forwardRef } from "react";

type TextInputProps = {
  title: string;
  className?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  tabIndex?: number;
  testId?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      title,
      className,
      placeholder,
      defaultValue,
      value,
      onChange,
      error = false,
      tabIndex,
      testId,
    },
    ref
  ) {
    return (
      <input
        tabIndex={tabIndex}
        ref={ref}
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={`outline-none focus:border-neutral-500 focus:border-2 border-[1px] border-neutral-300 rounded-lg h-8 px-2 text-xl ${className} ${
          error ? "bg-red-200 border-red-500" : ""
        }`}
        data-testid={testId}
        title={title}
      />
    );
  }
);
