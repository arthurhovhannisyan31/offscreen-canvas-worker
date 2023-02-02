import { useRef, memo } from "react";

import { useFPSMonitorInit } from "./hooks/useFPSMonitorInit";

import styles from "./FPSMonitor.module.css";

export const FPSMonitor = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useFPSMonitorInit(canvasRef.current);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} width={200} height={100} />
    </div>
  );
});

FPSMonitor.displayName = "FPSMonitor";
