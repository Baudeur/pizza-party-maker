import { forwardRef, useLayoutEffect } from "react";
import { TextInput } from "./TextInput";

type PriceInputProps = {
  className?: string;
  price: string;
  setPrice: (value: React.SetStateAction<string>) => void;
  tabIndex?: number;
  testId?: string;
};

export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  function PriceInput({ className, price, setPrice, tabIndex, testId }, ref) {
    function onPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
      const inputPrice = Number(event.target.value);
      if (Number.isNaN(inputPrice) || inputPrice < 0) {
        return;
      }
      if (inputPrice > 999) {
        setPrice("999");
        return;
      }
      if (
        event.target.value === "" ||
        event.target.value.endsWith(".") ||
        event.target.value.endsWith(".0") ||
        event.target.value.endsWith(".00") ||
        event.target.value.match(".*\\.[0-9]0$")
      ) {
        setPrice(event.target.value);
        return;
      }
      const parts = event.target.value.split(".");
      if (parts[1] == undefined) {
        setPrice(parts[0]);
      } else {
        setPrice(parts[0] + "." + parts[1].slice(0, 2));
      }
    }

    useLayoutEffect(() => {
      if (price.match(".*\\.[1-9]$")) {
        setPrice(price + "0");
      }
    }, []);

    return (
      <div className={`flex items-center relative ${className}`}>
        <div className="absolute text-xl right-2 z-10 pointer-events-none">
          €
        </div>
        <TextInput
          tabIndex={tabIndex}
          ref={ref}
          className={`pr-[25px] text-right ${className}`}
          value={price}
          onChange={onPriceChange}
          error={false}
          testId={testId}
        />
      </div>
    );
  }
);
