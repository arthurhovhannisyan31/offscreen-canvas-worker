import {
  FpsCanvasModule,
} from "./modules/fps-module";
import {
  TwinsManagerModule,
} from "./modules/twins-module";
import { type PostAction, type UpdateAction } from "./types";
import { Subject, AbstractWorker, createMessage, WORKER_STOP, createSimpleAction } from "../common";

class MainModuleWorker extends AbstractWorker<PostAction>{
  subject = new Subject<Message<UpdateAction>>();

  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
    this.init();
  }

  init():void {
    this.subject.addObserver(new TwinsManagerModule(this.onMessage));
    this.subject.addObserver(new FpsCanvasModule(this.onMessage));
  }

  onMessage(message: Message<UpdateAction>): void {
    this.subject.notify(message);
  }

  terminate():void {
    this.subject.notify(createMessage(createSimpleAction(WORKER_STOP)));
    super.terminate();
  }
}

new MainModuleWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
