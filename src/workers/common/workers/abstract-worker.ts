import { createAction, ERROR } from "../actions";

export abstract class AbstractWorker<T> {
  protected worker: DedicatedWorkerGlobalScope;

  protected constructor(worker: DedicatedWorkerGlobalScope) {
    this.worker = worker;

    this.worker.self.onmessage = this.processMessage.bind(this);
  }

  abstract processMessage(_: Message): void;

  postMessage(message: T, transfer: Transferable[] = []):void {
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
