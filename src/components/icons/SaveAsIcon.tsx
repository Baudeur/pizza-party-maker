import { Plus, Save } from "lucide-react";

type IconProp = {
  size: number;
  strokeWidth: number;
  backgroundColor: string;
};

export function SaveAsIcon({
  size = 20,
  strokeWidth = 2,
  backgroundColor,
}: Readonly<IconProp>) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Save size={size} strokeWidth={strokeWidth} className="absolute" />
      <div
        className={`absolute translate-x-1/2 translate-y-1/2 ${backgroundColor} rounded-full`}
      >
        <Plus size={size / 2} strokeWidth={strokeWidth * 2} />
      </div>
    </div>
  );
}
