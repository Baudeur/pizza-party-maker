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
    <div className={`relative h-fit w-fit flex items-center justify-center`}>
      <Save size={size} strokeWidth={strokeWidth} />
      <div
        className={`absolute translate-x-1/2 translate-y-1/2 ${backgroundColor} rounded-full`}
      >
        <Plus size={size / 2} strokeWidth={strokeWidth * 2} />
      </div>
    </div>
  );
}
