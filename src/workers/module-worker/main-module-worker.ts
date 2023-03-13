import type { UpdateAction, SendAction } from "./types";

import { PerformanceCanvasModule } from "./modules/fps-module";
import { TwinsManagerModule } from "./modules/twins-module";
import { WORKER_STOP, createSimpleAction, WORKER_TERMINATE } from "../common";
import { AbstractSubjectWorker } from "../common/workers/abstract-subject-worker";

class MainModuleWorker extends AbstractSubjectWorker<Message<UpdateAction>, SendAction>{
  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
    this.init();

    this.onMessage = this.onMessage.bind(this);
  }

  init():void {
    this.subject.addObserver(new TwinsManagerModule(this.update, this.postMessage));
    this.subject.addObserver(new PerformanceCanvasModule(this.update, this.postMessage));
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
