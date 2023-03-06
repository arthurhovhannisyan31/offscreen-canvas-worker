import type { PostAction, UpdateAction } from "./types";

import { PerformanceCanvasModule } from "./modules/fps-module";
import { TwinsManagerModule } from "./modules/twins-module";
import { WORKER_STOP, createSimpleAction, WORKER_TERMINATE } from "../common";
import { AbstractSubjectWorker } from "../common/workers/abstract-subject-worker";

class MainModuleWorker extends AbstractSubjectWorker<PostAction, UpdateAction>{
  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
    this.init();

    this.onMessage = this.onMessage.bind(this);
  }

  init():void {
    this.subject.addObserver(new TwinsManagerModule(this.onMessage));
    this.subject.addObserver(new PerformanceCanvasModule(this.onMessage));
  }

  override onMessage(message: Message<UpdateAction>): void {
    if (message.data.type === WORKER_TERMINATE){
      this.terminate();

      return;
    }
    super.onMessage(message);
  }

  terminate():void {
    this.subject.notify(createSimpleAction(WORKER_STOP));
    super.terminate();
  }
}

new MainModuleWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
