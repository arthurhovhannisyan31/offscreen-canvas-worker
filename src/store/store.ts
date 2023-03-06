import { ModuleWorkerStore } from "./moduleWorkerStore";

export interface RootStore {
  moduleWorker: ModuleWorkerStore
}

export const rootStore: RootStore = {
  moduleWorker: new ModuleWorkerStore()
};
