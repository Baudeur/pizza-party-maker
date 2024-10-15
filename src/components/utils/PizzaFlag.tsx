export type FlagState = "perfect" | "good" | "okay" | "bad" | "cantEat" | "N/A";

export function PizzaFlag({ flagState }: { readonly flagState: FlagState }) {
  let color = "bg-gray-300";
  let label = "N/A";
  let emoji = "❌";
  switch (flagState) {
    case "perfect":
      color = "bg-sky-400";
      label = "Perfect";
      emoji = "👌";
      break;
    case "good":
      color = "bg-green-400";
      label = "Good";
      emoji = "😊";
      break;
    case "okay":
      color = "bg-yellow-400";
      label = "Okay";
      emoji = "😕";
      break;
    case "bad":
      color = "bg-red-400";
      label = "Bad";
      emoji = "😖";
      break;
    case "cantEat":
      color = "bg-purple-400";
      label = "Can't eat";
      emoji = "💀";
      break;
  }
  return (
    <div
      className={`${color} h-full w-full rounded-lg flex justify-center flex-col min-w-24 min-h-14 cursor-default`}
    >
      <span className="font-bold text-lg">{label}</span>
      <span className="font-bold text-lg">{emoji}</span>
    </div>
  );
}
