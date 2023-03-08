import { memo, useCallback, useState, type ChangeEvent } from "react";

import type { WorkerControlsProps } from "./types";

import { heavyTaskRun } from "../../helpers";

import styles from "./WorkerControls.module.css";

const DEFAULT_TIMEOUT = 100000000;

const getToggleLabel = (val: boolean): string => val ? "Stop": "Start";
const getStatusLabel = (val: boolean): string => val ? "Active": "Passive";

export const WorkerControlsComponent = memo<WorkerControlsProps>(({
  twinsModuleActive,
  fpsModuleActive,
  setModuleWorkerStatus,
  toggleAllWorkers
}) => {
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

  const setFpsWorkerStatus = useCallback(() => {
    setModuleWorkerStatus("FpsModuleActive", !fpsModuleActive);
  }, [setModuleWorkerStatus, fpsModuleActive]);

  const setTwinsWorkerStatus = useCallback(() => {
    setModuleWorkerStatus("TwinsModuleActive", !twinsModuleActive);
  }, [setModuleWorkerStatus, twinsModuleActive]);

  return(
      <div className={styles.container}>
        <div className={styles.controlContainer}>
          <button onClick={setFpsWorkerStatus}>
            {getToggleLabel(fpsModuleActive)} fps module
          </button>
          <span>Fps module status: {getStatusLabel(fpsModuleActive)}</span>
        </div>
        <div className={styles.controlContainer}>
          <button onClick={setTwinsWorkerStatus}>
            {getToggleLabel(twinsModuleActive)} twins module
          </button>
          <span>Twins module status: {getStatusLabel(twinsModuleActive)}</span>
        </div>
        <div className={styles.controlContainer}>
          <button onClick={toggleAllWorkers}>
            {
              (fpsModuleActive !== twinsModuleActive) ? "Start" :
              getToggleLabel(fpsModuleActive)
            } all modules
          </button>
          <span>All modules status: {
            (fpsModuleActive !== twinsModuleActive) ? "Partially active" :
            getStatusLabel(fpsModuleActive && twinsModuleActive)
          }</span>
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

WorkerControlsComponent.displayName = "WorkerControlsComponent";
