import { memo, useCallback, useState, type ChangeEvent } from "react";

import type { WorkerControlsProps } from "./types";

import { heavyTaskRun } from "../../helpers";

import styles from "./WorkerControls.module.css";

const DEFAULT_TIMEOUT = 100000000;

export const WorkerControls = memo<WorkerControlsProps>(() => {
  const [heavyTaskValue, setHeavyTaskValue] = useState(DEFAULT_TIMEOUT);

  const [counter, setCounter] = useState(0);
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    if (!Number.isNaN(value) && value >= 0 && value <= DEFAULT_TIMEOUT * 100){
      setHeavyTaskValue(value);
    }
  }, []);

  const startHeavyTask = useCallback(() => {
    heavyTaskRun(heavyTaskValue);
  }, [heavyTaskValue]);

  const handleSetCounter = useCallback((type: string) => () => {
    setCounter((val) => {
      if (type === "inc"){
        return ++val;
      }  else if(val > 0) {
        return --val;
      } else {
        return val;
      }
    });
  }, []);

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
          <div className={styles.container}>
            <button
              onClick={handleSetCounter("inc")}
              className={styles.counterButton}
            >+</button>
            <button
              onClick={handleSetCounter("dec")}
              className={styles.counterButton}
              disabled={counter <= 0}
            >-</button>
          </div>
          <span>Counter: {counter}</span>
        </div>
        <div className={styles.controlContainer}>
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
