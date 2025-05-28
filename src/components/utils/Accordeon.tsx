import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatNameForTestId } from "../../services/utils";

type AccordeonProps = {
  height: string;
  elements: {
    expandable: { id: string; name: string };
    header: ReactNode;
    expand: ReactNode;
  }[];
  className?: string;
};

export function Accordeon({ elements, height, className }: AccordeonProps) {
  const [extended, setExtended] = useState(-1);
  const { t } = useTranslation();
  return (
    <div className={className}>
      {elements.map(({ expandable, header, expand }, index) => (
        <div
          key={expandable.id}
          className={`h-fit flex flex-col items-start w-full bg-amber-300 ${
            index === 0 && "rounded-t-lg"
          } ${index === elements.length - 1 && "rounded-b-lg"}`}
        >
          <div
            role="button"
            className="h-10 flex items-center text-lg font-bold cursor-pointer text-left w-full px-2"
            onClick={() => setExtended(extended === index ? -1 : index)}
            title={t("expand-element", { element: expandable.name })}
            data-testid={`expand-${formatNameForTestId(expandable.name)}`}
          >
            <ChevronDown
              size={15}
              strokeWidth={4}
              className={`mr-2 ${
                extended == index ? "-rotate-180" : "rotate-0"
              } transition-all`}
            />
            {header}
          </div>
          <div
            style={{
              height: extended == index ? height : "0rem",
            }}
            className={`transition-all ease-in-out duration-300 overflow-hidden px-2 w-full`}
          >
            {expand}
          </div>
          {index !== elements.length - 1 && (
            <div className="bg-amber-200 w-full h-[2px]"></div>
          )}
        </div>
      ))}
    </div>
  );
}
