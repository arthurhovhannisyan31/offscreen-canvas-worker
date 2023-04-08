import { ModuleWorkerStore } from "./moduleWorkerStore";
import { type Observer, Subject } from "../workers/common";

export class RootStore {
  public subject = new Subject();
  public moduleWorker: ModuleWorkerStore;

  constructor() {
    this.moduleWorker = new ModuleWorkerStore(this);

    this.subject.addObserver(this.moduleWorker);
  }

  get items(): Observer<Action<any>>[]  {
    return [this.moduleWorker];
  }
}

export const rootStore = new RootStore();
