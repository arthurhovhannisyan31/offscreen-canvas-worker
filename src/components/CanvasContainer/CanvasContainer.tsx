import { memo } from "react";

import { useModuleWorker } from "./hooks/useModuleWorker";
import { useStandaloneWorkers } from "./hooks/useStandaloneWorkers";

import styles from "./CanvasContainer.module.css";

export const CanvasContainer = memo(() => {
  const { refs: standAloneWorkerRefs } = useStandaloneWorkers();
  const { refs: moduleWorkerRefs } = useModuleWorker();

  return(
      <div className={styles.container}>
        <h1 className={styles.label}>Offscreen canvas worker</h1>
        <div className={styles.box}>
          <span className={styles.secondaryLabel}>Standalone workers for each canvas</span>
          <div className={styles.canvasContainer}>
            <canvas className={styles.canvas} ref={standAloneWorkerRefs[0]} />
            <canvas className={styles.canvas} ref={standAloneWorkerRefs[1]} />
          </div>
        </div>
        <div className={styles.box}>
          <span className={styles.secondaryLabel}>Worker with modules for each canvas</span>
          <div className={styles.canvasContainer}>
              <canvas className={styles.canvas} ref={moduleWorkerRefs[0]} />
              <canvas className={styles.canvas} ref={moduleWorkerRefs[1]} />
          </div>
          <div className={styles.canvasContainer}>
            <canvas width={600} height={150} className={styles.canvas} />
          </div>
        </div>
      </div>
  );
});

CanvasContainer.displayName = "CanvasContainer";

export default CanvasContainer;
