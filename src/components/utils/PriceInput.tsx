import { forwardRef } from "react";
import { TextInput } from "./TextInput";

type PriceInputProps = {
  className?: string;
  price: string;
  setPrice: (value: React.SetStateAction<string>) => void;
  tabIndex?: number;
};

export const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  function PriceInput({ className, price, setPrice, tabIndex }, ref) {
    function onPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
      const inputPrice = Number(event.target.value);
      if (Number.isNaN(inputPrice)) {
        return;
      }
      if (
        event.target.value === "" ||
        event.target.value.slice(-1) === "." ||
        event.target.value.slice(-2) === ".0" ||
        event.target.value.slice(-3) === ".00"
      ) {
        setPrice(event.target.value);
        return;
      }
      if (inputPrice > 999) {
        setPrice("999");
        return;
      }
      setPrice(Math.round(inputPrice * 100) / 100 + "");
    }

    return (
      <div className={`flex items-center relative ${className}`}>
        <label className="absolute text-xl right-2 z-10">€</label>
        <TextInput
          tabIndex={tabIndex}
          ref={ref}
          className="pr-[25px] text-right"
          value={price}
          onChange={onPriceChange}
          error={false}
        />
      </div>
    );
  }
);
