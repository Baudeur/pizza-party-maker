export function Spinner() {
  return (
    <div className="flex w-full justify-center">
      <img
        src={"src/assets/LoadingOmni.png"}
        className="size-8 animate-spin"
        alt="Loading dot"
      />
    </div>
  );
}
