import { ModuleWorkerStore } from "./moduleWorkerStore";

interface RootStore {
  moduleWorker: ModuleWorkerStore
}

export const rootStore: RootStore = {
  moduleWorker: new ModuleWorkerStore()
};
