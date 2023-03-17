import { ModuleWorkerStore } from "./moduleWorkerStore";
import { storeSubject } from "./storeSubject";
import { type Observer } from "../workers/common";

export class RootStore {
  moduleWorker: ModuleWorkerStore;

  constructor() {
    this.moduleWorker = new ModuleWorkerStore(this);
  }

  get items(): Observer<Action<any>>[]  {
    return [this.moduleWorker];
  }
}

export const rootStore = new RootStore();

rootStore.items.forEach((storeEntry: Observer<Action<any>>) => {
  storeSubject.addObserver(storeEntry);
});
