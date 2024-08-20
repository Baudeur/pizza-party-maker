import { useEffect, useRef, useState } from "react";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { Check, Pencil } from "lucide-react";
import { PriceInput } from "./PriceInput";

type NameEditState = "nothing" | "hovered" | "focused";

type EditableProps = {
  type: "text" | "price";
  initialValue: string;
  validate: (value: string) => void;
  display: (value: string) => string;
  textClass?: string;
};

export function Editable({
  type,
  initialValue,
  validate,
  display,
  textClass,
}: EditableProps) {
  const [nameEditState, setNameEditState] = useState<NameEditState>("nothing");
  const [name, setName] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  function event(event: string) {
    switch (event) {
      case "mouseEnter":
        if (nameEditState == "nothing") setNameEditState("hovered");
        return;
      case "mouseLeave":
        if (nameEditState == "hovered") setNameEditState("nothing");
        return;
      case "validate":
        setNameEditState("nothing");
        validate(name);
        return;
      case "clickEdit":
        setNameEditState("focused");
        return;
      case "cancel":
        setNameEditState("nothing");
        setName(initialValue);
        return;
    }
  }

  useEffect(() => {
    if (nameEditState == "focused") {
      inputRef.current?.focus();
    }
  }, [nameEditState]);

  return (
    <div
      className="overflow-hidden"
      onKeyDown={(e) => {
        if (e.key == "Enter") event("validate");
        if (e.key == "Escape") event("cancel");
      }}
      onMouseEnter={() => event("mouseEnter")}
      onMouseLeave={() => event("mouseLeave")}
    >
      <div className="h-8">
        <div className="flex justify-between relative">
          {nameEditState != "focused" && (
            <div
              className={`truncate absolute right-0 left-0 transition-all ease-out ${textClass} ${
                nameEditState == "nothing" ? "w-full" : "w-[calc(100%-32px)]"
              }`}
            >
              {display(initialValue)}
            </div>
          )}
          <div
            className={`absolute ${
              nameEditState == "nothing" ? "right-[-32px]" : "right-0"
            } transition-all ease-out`}
          >
            {nameEditState == "hovered" && (
              <Button
                className="rounded-lg min-w-8"
                color="green"
                onClick={() => {
                  event("clickEdit");
                }}
              >
                <Pencil size={20} strokeWidth={2} />
              </Button>
            )}
          </div>
        </div>
        {nameEditState == "focused" && (
          <div className="flex justify-between">
            {type == "text" && (
              <TextInput
                className="mr-2"
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {type == "price" && (
              <PriceInput
                className="mr-2"
                ref={inputRef}
                price={name}
                setPrice={setName}
              />
            )}
            <Button
              className="rounded-lg min-w-8"
              color="green"
              onClick={() => {
                event("validate");
              }}
            >
              <Check size={20} strokeWidth={2} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
