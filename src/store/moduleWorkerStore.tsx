import { makeObservable, observable, action, computed } from "mobx";

import type { Observer } from "workers/common";

import { ModuleStatus, type WorkerActivityStatus } from "../workers/common/types";
import { WORKER_LOG_FPS_STATUS, WORKER_LOG_TWINS_STATUS } from "../workers/module-worker/actions";

export enum ModuleWorkerEntries {
  Fps = "Fps",
  Twins = "Twins",
}

export type ModuleWorkerProperty = `${ModuleWorkerEntries}ModuleStatus`;

type ModuleWorkerStoreFields = Record<ModuleWorkerProperty, ModuleStatus>;

export class ModuleWorkerStore implements Observer<Action<any>> {
  FpsModuleStatus = ModuleStatus.DISABLED;
  TwinsModuleStatus = ModuleStatus.DISABLED;
  statusLog: WorkerActivityStatus[] = [];

  constructor() {
    makeObservable(this, {
      FpsModuleStatus: observable,
      TwinsModuleStatus: observable,
      statusLog: observable,
      setModuleStatus: action,
      modulesStatus: computed,
    });
  }

  get modulesStatus(): ModuleWorkerStoreFields {
    return {
      FpsModuleStatus: this.FpsModuleStatus,
      TwinsModuleStatus: this.TwinsModuleStatus,
    };
  }

  setModuleStatus = (moduleName: ModuleWorkerProperty, status: ModuleStatus): void => {
    this[moduleName] = status;
  };

  update(action: Action<WorkerActivityStatus>): void {
    switch (action.type) {
      case WORKER_LOG_TWINS_STATUS: {
        this.setModuleStatus("TwinsModuleStatus", action.payload.status);
        this.statusLog.push(action.payload);
        break;
      }
      case WORKER_LOG_FPS_STATUS: {
        this.setModuleStatus("FpsModuleStatus", action.payload.status);
        this.statusLog.push(action.payload);
        break;
      }
    }
  }
}
