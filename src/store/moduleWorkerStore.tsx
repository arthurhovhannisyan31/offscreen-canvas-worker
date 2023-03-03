import { makeObservable, observable, action, computed } from "mobx";

export enum ModuleStatus {
  Off,
  On
}

export enum ModuleWorkerEntries {
  Fps = "Fps",
  Twins = "Twins",
  All = "All"
}

export type ModuleWorkerProperty = `${ModuleWorkerEntries}ModuleActive`;

type ModuleWorkerStoreFields = Record<ModuleWorkerProperty, boolean>;

export class ModuleWorkerStore {
  FpsModuleActive = ModuleStatus.Off;
  TwinsModuleActive = ModuleStatus.Off;
  AllModuleActive = ModuleStatus.Off;

  constructor() {
    makeObservable(this, {
      // fields
      FpsModuleActive: observable,
      TwinsModuleActive: observable,
      AllModuleActive: observable,
      // methods
      setModuleStatus: action,
      modulesStatus: computed,
    });
  }

  get modulesStatus(): ModuleWorkerStoreFields {
    return {
      FpsModuleActive: !!this.FpsModuleActive,
      TwinsModuleActive: !!this.TwinsModuleActive,
      AllModuleActive: !!this.AllModuleActive,
    };
  }

  setModuleStatus = (moduleName: ModuleWorkerProperty, status: ModuleStatus): void => {
    this[moduleName] = status;
  };
}
