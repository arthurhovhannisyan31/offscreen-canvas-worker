import { makeObservable, observable, action, computed } from "mobx";

export enum ModuleWorkerEntries {
  Fps = "Fps",
  Twins = "Twins",
}

export type ModuleWorkerProperty = `${ModuleWorkerEntries}ModuleActive`;

type ModuleWorkerStoreFields = Record<ModuleWorkerProperty, boolean>;

export class ModuleWorkerStore {
  FpsModuleActive = false;
  TwinsModuleActive = false;

  constructor() {
    makeObservable(this, {
      FpsModuleActive: observable,
      TwinsModuleActive: observable,
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
}
