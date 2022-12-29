import { Subject , AbstractWorker } from "../common";
import { CanvasManagerModule } from "./modules/canvas-manager-module";

type MainWorkerAction = Action<any>;

class MainWorker extends AbstractWorker<MainWorkerAction>{
  subject = new Subject();

  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);

    this.init();
  }

  init():void {
    this.subject.addObserver(new CanvasManagerModule());
  }

  processMessage(message: Message<MainWorkerAction>): void {
    this.subject.notify(message);
  }
}

new MainWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
