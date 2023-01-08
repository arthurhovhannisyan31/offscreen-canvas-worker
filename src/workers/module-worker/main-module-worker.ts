import { Subject , AbstractWorker } from "../common";
import {
  CanvasManagerModule,
  type UpdateAction as CanvasManagerUpdateAction,
  type PostAction as CanvasManagerPostAction,
} from "./modules/canvas-manager-module";

type PostAction = CanvasManagerPostAction;
type UpdateAction = CanvasManagerUpdateAction;

class MainModuleWorker extends AbstractWorker<PostAction>{
  subject = new Subject<Message<UpdateAction>>();

  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
    this.init();
  }

  init():void {
    this.subject.addObserver(new CanvasManagerModule(this.onMessage));
  }

  onMessage(message: Message<UpdateAction>): void {
    this.subject.notify(message);
  }
}

new MainModuleWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
