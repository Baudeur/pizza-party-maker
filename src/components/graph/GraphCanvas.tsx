import { useEffect, useRef } from "react";
import { People } from "../../modules/people/slice";

type GraphCanvasProps = {
  proportions: People;
  size: number;
};

export function GraphCanvas({ proportions, size }: GraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function ShiftCoords({ x, y }: { x: number; y: number }, shift: number) {
    return { x: x + shift, y: y + shift };
  }

  function enlargeCoords({ x, y }: { x: number; y: number }, enlarge: number) {
    return { x: x * enlarge, y: y * enlarge };
  }

  function getCoords(deg: number) {
    return {
      x: Math.cos(((deg - 90) * Math.PI) / 180),
      y: Math.sin(((deg - 90) * Math.PI) / 180),
    };
  }

  useEffect(() => {
    const { normal, pescoVegetarian, vegetarian, vegan } = proportions;
    const total = normal + pescoVegetarian + vegetarian + vegan;
    const angles = [
      0,
      (normal / total) * 360,
      ((normal + pescoVegetarian) / total) * 360,
      ((normal + pescoVegetarian + vegetarian) / total) * 360,
      360,
    ];
    const colors = ["#EF4444", "#3B82F6", "#22C55E", "#F97316"];
    const normalImage = new Image();
    normalImage.src = "/src/assets/Meat.png";
    const pescoVegetarianImage = new Image();
    pescoVegetarianImage.src = "/src/assets/Fish.png";
    const vegetarianImage = new Image();
    vegetarianImage.src = "/src/assets/Cheese.png";
    const veganImage = new Image();
    veganImage.src = "/src/assets/Carrot.png";
    const images = [
      normalImage,
      pescoVegetarianImage,
      vegetarianImage,
      veganImage,
    ];

    const borderWidth = Math.floor(size / 50 / 2) * 2;
    const newSize = size - borderWidth;
    const center = {
      x: size / 2,
      y: size / 2,
    };
    const positions = [
      ShiftCoords(
        enlargeCoords(getCoords(angles[1] / 2), newSize * 0.4),
        size / 2
      ),
      ShiftCoords(
        enlargeCoords(getCoords((angles[1] + angles[2]) / 2), newSize * 0.4),
        size / 2
      ),
      ShiftCoords(
        enlargeCoords(getCoords((angles[2] + angles[3]) / 2), newSize * 0.4),
        size / 2
      ),
      ShiftCoords(
        enlargeCoords(getCoords((angles[3] + 360) / 2), newSize * 0.4),
        size / 2
      ),
    ];

    const ctx = canvasRef.current?.getContext("2d");
    if (ctx === null || ctx === undefined) return;
    ctx.clearRect(
      0,
      0,
      canvasRef.current?.width ?? 0,
      canvasRef.current?.height ?? 0
    );
    if (total === 0) {
      ctx.fillStyle = "#E5E5E5";
      ctx.strokeStyle = "black";
      ctx.lineWidth = borderWidth;
      ctx.beginPath();
      ctx.arc(center.x, center.y, newSize / 2, 0, 360, false);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.font = `${size / 8}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("N/A", center.x, center.y);
      return;
    }
    for (let i = 0; i < 4; i++) {
      if (angles[i + 1] - angles[i] === 0) continue;
      ctx.fillStyle = colors[i];
      ctx.strokeStyle = "black";
      ctx.lineWidth = borderWidth;
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.arc(
        center.x,
        center.y,
        newSize / 2,
        ((angles[i] - 90) * Math.PI) / 180,
        ((angles[i + 1] - 90) * Math.PI) / 180,
        false
      );
      ctx.lineTo(center.x, center.y);
      ctx.fill();
      ctx.stroke();
    }
    for (let i = 0; i < 4; i++) {
      if (angles[i + 1] - angles[i] === 0) continue;
      images[i].onload = () => {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(
          images[i],
          positions[i].x - size / 16,
          positions[i].y - size / 16,
          size / 8,
          size / 8
        );
      };
    }
    ctx.beginPath();

    ctx.arc(center.x, center.y, borderWidth / 2, 0, 360);
    ctx.fillStyle = "black";
    ctx.fill();
  }, [canvasRef, size, proportions]);
  return (
    <div>
      <div style={{ width: `${size}px`, height: `${size}px` }}>
        <canvas ref={canvasRef} height={size} width={size} />
      </div>
    </div>
  );
}
