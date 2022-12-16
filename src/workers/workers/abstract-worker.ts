import { createAction, ERROR } from "workers/common/actions";

export default abstract class AbstractWorker<T> {
  protected worker: DedicatedWorkerGlobalScope;

  protected constructor(worker: DedicatedWorkerGlobalScope) {
    this.worker = worker;
    this.worker.addEventListener("message", this.onMessage);
    this.worker.addEventListener("messageerror", this.onMessageError);
  }

  abstract onMessage(_: Message): void;

  postMessage(message: T, transfer: Transferable[] = []):void {
    this.worker.postMessage(message, transfer);
  }

  onMessageError(error: Message):void {
    this.worker.postMessage(createAction(ERROR, error));
  }

  terminate():void {
    this.worker.onerror = null;
    this.worker.onmessage = null;
    this.worker.close();
  }
}
