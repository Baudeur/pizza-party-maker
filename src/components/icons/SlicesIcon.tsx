import { t } from "i18next";
import slices from "../../assets/Slices Icons.png";

type SlicesIconProps = {
  quantity: number;
  height: number;
  testId?: string;
};

export function SlicesIcon({ quantity, height, testId }: SlicesIconProps) {
  const column = (quantity - 1) % 4;
  const row = Math.floor((quantity - 1) / 4);
  return (
    <div
      className="overflow-hidden flex relative justify-center"
      style={{
        minHeight: `${height}rem`,
        minWidth: `${height * 2}rem`,
        maxHeight: `${height}rem`,
        maxWidth: `${height * 2}rem`,
      }}
      data-testid={testId}
    >
      <div
        className="overflow-hidden flex relative justify-center"
        style={{
          minHeight: `${height}rem`,
          minWidth: `${row < 2 ? height : height * 2}rem`,
          maxHeight: `${height}rem`,
          maxWidth: `${row < 2 ? height : height * 2}rem`,
        }}
        title={t("slices-icon-title", { quantity })}
      >
        <img
          className="absolute"
          src={slices}
          alt={t("slices-icon-title", { quantity })}
          style={{
            minHeight: `${height * 4}rem`,
            minWidth: `${height * 8}rem`,
            top: `-${height * row}rem`,
            left: `-${height * 2 * column}rem`,
          }}
        />
      </div>
    </div>
  );
}
