import type { PostAction, UpdateAction } from "./types";

import { FpsCanvasModule } from "./modules/fps-module";
import { TwinsManagerModule } from "./modules/twins-module";
import { Subject, AbstractWorker,  WORKER_STOP, createSimpleAction } from "../common";

class MainModuleWorker extends AbstractWorker<PostAction>{
  subject = new Subject<UpdateAction>();

  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
    this.init();

    this.onMessage = this.onMessage.bind(this);
  }

  init():void {
    this.subject.addObserver(new TwinsManagerModule(this.onMessage));
    this.subject.addObserver(new FpsCanvasModule(this.onMessage));
  }

  override onMessage(message: Message<UpdateAction>): void {
    this.subject.notify(message.data);
  }

  terminate():void {
    this.subject.notify(createSimpleAction(WORKER_STOP));
    super.terminate();
  }
}

new MainModuleWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
