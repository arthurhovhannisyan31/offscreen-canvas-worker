import { useRef, memo, useState } from "react";

import { useFPSMonitorInit } from "./hooks";
import { useCanvasDrag } from "./hooks/useCanvasDrag";
import { type PointerPosition } from "./types";

import styles from "./FPSMonitor.module.css";

export const PerformanceMonitor = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [position, setPosition] = useState<PointerPosition>({ x: 0, y: 0 });

  const { onPointerDown, onPointerUp, onPointerMove } = useCanvasDrag({
    canvasRef, isCaptured, setIsCaptured, setPosition
  });

  useFPSMonitorInit(canvasRef.current);

  return (
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        style={{ top: position.y, left: position.x }}
        width={200}
        height={100}
      />
  );
});

PerformanceMonitor.displayName = "PerformanceMonitor";
