import spinner from "../../assets/LoadingOmni.png";

export function Spinner() {
  return (
    <div className="flex w-full justify-center">
      <img src={spinner} className="size-8 animate-spin" alt="Loading dot" />
    </div>
  );
}
