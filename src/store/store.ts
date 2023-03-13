import { ModuleWorkerStore } from "./moduleWorkerStore";
import { storeSubject } from "./storeSubject";
import { type Observer } from "../workers/common";

export interface RootStore {
  moduleWorker: ModuleWorkerStore
}

export const rootStore: RootStore = {
  moduleWorker: new ModuleWorkerStore()
};

Object.values(rootStore).forEach((storeEntry: Observer<Action<any>>) => {
  storeSubject.addObserver(storeEntry);
});
