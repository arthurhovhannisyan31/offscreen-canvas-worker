import { memo } from "react";

import { useTwinsModuleWorker } from "./hooks";

import styles from "./CanvasContainer.module.css";

export const CanvasContainer = memo(() => {
  const { refs: moduleWorkerRefs } = useTwinsModuleWorker();

  return(
      <div className={styles.container}>
        <h1 className={styles.label}>Offscreen canvas worker</h1>
        <div className={styles.box}>
          <span className={styles.secondaryLabel}>Worker with modules for each canvas</span>
          <div className={styles.canvasContainer}>
              <canvas width={320} height={200} className={styles.canvas} ref={moduleWorkerRefs[0]} />
              <canvas width={320} height={200} className={styles.canvas} ref={moduleWorkerRefs[1]} />
          </div>
        </div>
      </div>
  );
});

CanvasContainer.displayName = "CanvasContainer";
