import { ERROR } from "../actions";
import { createAction } from "../helpers";
import { MessageBatcher } from "../util-classes/message-batcher";

export abstract class AbstractWorker<P> {
  protected worker: DedicatedWorkerGlobalScope;
  protected messageBatcher: MessageBatcher;
  messagesList: Message[] = [];
  interval: number;
  timeoutID?: ReturnType<typeof setTimeout>;

  protected constructor(worker: DedicatedWorkerGlobalScope, interval = 50) {
    this.worker = worker;
    this.interval = interval;
    this.worker.self.onmessage = this.onMessage.bind(this);
    this.messageBatcher = new MessageBatcher();
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
