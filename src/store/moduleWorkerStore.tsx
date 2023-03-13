import { makeObservable, observable, action, computed } from "mobx";

import type { Observer } from "workers/common";

import { type WorkerActivityStatus } from "../workers/common/types";
import { WORKER_LOG_FPS_STATUS, WORKER_LOG_TWINS_STATUS } from "../workers/module-worker/actions";

export enum ModuleWorkerEntries {
  Fps = "Fps",
  Twins = "Twins",
}

export type ModuleWorkerProperty = `${ModuleWorkerEntries}ModuleActive`;

type ModuleWorkerStoreFields = Record<ModuleWorkerProperty, boolean>;

export class ModuleWorkerStore implements Observer<Action<any>> {
  FpsModuleActive = false;
  TwinsModuleActive = false;
  statusLog: WorkerActivityStatus[] = [];

  constructor() {
    makeObservable(this, {
      FpsModuleActive: observable,
      TwinsModuleActive: observable,
      statusLog: observable,
      setModuleStatus: action,
      toggleAllWorkers: action,
      modulesStatus: computed,
    });
  }

  get modulesStatus(): ModuleWorkerStoreFields {
    return {
      FpsModuleActive: this.FpsModuleActive,
      TwinsModuleActive: this.TwinsModuleActive,
    };
  }

  setModuleStatus = (moduleName: ModuleWorkerProperty, status: boolean): void => {
    this[moduleName] = status;
  };

  toggleAllWorkers = (): void => {
    if (this.FpsModuleActive && this.TwinsModuleActive){
      this.FpsModuleActive = false;
      this.TwinsModuleActive = false;
    } else if (!this.FpsModuleActive || !this.TwinsModuleActive){
      this.FpsModuleActive = true;
      this.TwinsModuleActive = true;
    }
  };

  update(action: Action<WorkerActivityStatus>): void {
    switch (action.type) {
      case WORKER_LOG_TWINS_STATUS: {
        this.setModuleStatus("TwinsModuleActive", action.payload.status);
        this.statusLog.push(action.payload);
        break;
      }
      case WORKER_LOG_FPS_STATUS: {
        this.setModuleStatus("FpsModuleActive", action.payload.status);
        this.statusLog.push(action.payload);
        break;
      }
    }
  }
}
