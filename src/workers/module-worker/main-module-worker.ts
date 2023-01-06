import { Subject , AbstractWorker } from "../common";
import {
  CanvasManagerModule,
  type UpdateAction as CanvasManagerUpdateAction,
  type PostAction as CanvasManagerPostAction,
} from "./modules/canvas-manager-module";

type PostAction = Action<CanvasManagerPostAction>;
type UpdateAction = Action<CanvasManagerUpdateAction>;

class MainModuleWorker extends AbstractWorker<PostAction>{
  subject = new Subject();

  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
    this.init();
  }

  init():void {
    this.subject.addObserver(new CanvasManagerModule(this.processMessage));
  }

  processMessage(message: Message<UpdateAction>): void {
    this.subject.notify(message.data);
  }
}

new MainModuleWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
