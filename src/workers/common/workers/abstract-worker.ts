import { ERROR } from "../actions";
import { createAction } from "../helpers";

export abstract class AbstractWorker<P> {
  protected worker: DedicatedWorkerGlobalScope;

  protected constructor(worker: DedicatedWorkerGlobalScope) {
    this.worker = worker;

    this.worker.self.onmessage = this.onMessage.bind(this);
  }

  abstract onMessage(_: Message): void;

  postMessage(message: P, transfer: Transferable[] = []):void {
    this.worker.postMessage(message, transfer);
  }

  onError(error: ErrorEvent):void {
    this.worker.postMessage(createAction(ERROR, error));
  }

  terminate():void {
    this.worker.onerror = null;
    this.worker.onmessage = null;
    this.worker.close();
  }
}
