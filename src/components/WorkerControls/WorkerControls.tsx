import { memo, useCallback, useState, type ChangeEvent } from "react";

import type { WorkerControlsProps } from "./types";

import { heavyTaskRun } from "../../helpers";

import styles from "./WorkerControls.module.css";

const DEFAULT_TIMEOUT = 10000000;

export const WorkerControls = memo<WorkerControlsProps>(() => {
  const [heavyTaskValue, setHeavyTaskValue] = useState(DEFAULT_TIMEOUT);

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    if (!Number.isNaN(value) && value >= 0 && value <= DEFAULT_TIMEOUT){
      setHeavyTaskValue(value);
    }
  }, []);

  const startHeavyTask = useCallback(() => {
    heavyTaskRun(heavyTaskValue);
  }, [heavyTaskValue]);

  return(
      <div className={styles.container}>
        <div className={styles.controlContainer}>
          <button>
            Start/stop fps module
          </button>
          <span>Fps module status:</span>
          <span>active</span>
        </div>
        <div className={styles.controlContainer}>
          <button>
            start/stop twins module
          </button>
          <span>Twins module status:</span>
          <span>active</span>
        </div>
        <div className={styles.controlContainer}>
          <button>
            start/stop all
          </button>
          <span>All modules status:</span>
          <span>active</span>
        </div>
        <div className={styles.controlContainer}>
          {/* no need to disable fields, no UI actions will be performed during sync task */}
          <button onClick={startHeavyTask}>
            Start heavy task
          </button>
          <input
            type="number"
            min={0}
            max={DEFAULT_TIMEOUT}
            value={heavyTaskValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
  );
});

WorkerControls.displayName = "WorkerControls";
