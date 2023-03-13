import { useCallback, useState, type ChangeEvent, type FC } from "react";

import type { WorkerControlsProps } from "./types";

import { heavyTaskRun } from "../../helpers";
import { createSimpleAction } from "../../workers/common";
import {
  FPS_MODULE_START,
  FPS_MODULE_STOP,
  TWINS_MODULE_START,
  TWINS_MODULE_STOP,
} from "../../workers/module-worker/actions";

import styles from "./WorkerControls.module.css";

const DEFAULT_TIMEOUT = 100000000;

const getToggleLabel = (val: boolean): string => val ? "Stop": "Start";
const getStatusLabel = (val: boolean): string => val ? "Active": "Passive";

export const WorkerControlsComponent: FC<WorkerControlsProps> = ({
  twinsModuleActive,
  fpsModuleActive,
  statusLog,
  worker
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
    worker?.postMessage(createSimpleAction(fpsModuleActive ? FPS_MODULE_STOP : FPS_MODULE_START));
  }, [fpsModuleActive, worker]);

  const setTwinsWorkerStatus = useCallback(() => {
    worker?.postMessage(createSimpleAction(twinsModuleActive ? TWINS_MODULE_STOP : TWINS_MODULE_START));
  }, [twinsModuleActive, worker]);

  const toggleAllWorkers = useCallback(() => {
    if (fpsModuleActive && twinsModuleActive){
      worker?.postMessage(createSimpleAction(TWINS_MODULE_STOP));
      worker?.postMessage(createSimpleAction(FPS_MODULE_STOP));
    } else if (!fpsModuleActive || !twinsModuleActive){
      worker?.postMessage(createSimpleAction(TWINS_MODULE_START));
      worker?.postMessage(createSimpleAction(FPS_MODULE_START));
    }
  }, [fpsModuleActive, twinsModuleActive, worker]);

  const statusLogContent = statusLog.map(({ message, timestamp }) => (
    <li key={timestamp}>
      {message}
    </li>
  )).reverse();

  return <div className={styles.container}>
        <div className={styles.block}>
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
          <div>
            Worker status log:
            <ul className={styles.statusLog}>
              {statusLogContent}
            </ul>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.controlContainer}>
            <div>
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
      </div>;
};

WorkerControlsComponent.displayName = "WorkerControlsComponent";
