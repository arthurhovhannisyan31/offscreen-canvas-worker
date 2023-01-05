import { memo } from "react";

import { useModuleWorker } from "./hooks/useModuleWorker";
import { useStandaloneWorkers } from "./hooks/useStandaloneWorkers";

import styles from "./CanvasContainer.module.css";

export const CanvasContainer = memo(() => {
  const { refs: standAloneWorkerRefs } = useStandaloneWorkers();
  const { refs: moduleWorkerRefs } = useModuleWorker();

  return(
      <div className={styles.container}>
        <span>Standalone workers for each canvas</span>
        <div className={styles.canvasContainer}>
          <canvas className={styles.canvas} ref={standAloneWorkerRefs[0]} />
          <canvas className={styles.canvas} ref={standAloneWorkerRefs[1]} />
        </div>
        <span>Worker with modules for each canvas</span>
        <div className={styles.canvasContainer}>
          <canvas className={styles.canvas} ref={moduleWorkerRefs[0]} />
          <canvas className={styles.canvas} ref={moduleWorkerRefs[1]} />
        </div>
      </div>
  );
});

CanvasContainer.displayName = "CanvasContainer";

export default CanvasContainer;
