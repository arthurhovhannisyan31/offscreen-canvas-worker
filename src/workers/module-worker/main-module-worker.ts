import {
  FpsCanvasModule,
} from "./modules/fps-module";
import {
  TwinsManagerModule,
} from "./modules/twins-module";
import { type PostAction, type UpdateAction } from "./types";
import { Subject , AbstractWorker } from "../common";

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
}

new MainModuleWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
