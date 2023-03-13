import { ERROR } from "../actions";
import { createAction, createMessage } from "../helpers";
import { type Observer } from "../observer";
import { MessageBatcher } from "../util-classes/message-batcher";

export abstract class AbstractWorker<P, A = Action<any>> implements Observer<A> {
  protected worker: DedicatedWorkerGlobalScope;
  protected messageBatcher: MessageBatcher;
  messagesList: Message[] = [];
  timeoutID?: ReturnType<typeof setTimeout>;

  protected constructor(worker: DedicatedWorkerGlobalScope) {
    this.worker = worker;
    this.messageBatcher = new MessageBatcher();
    this.worker.self.onmessage = this.onMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  abstract onMessage(message: Message): void;

  update(action: A):void {
    this.onMessage(createMessage(action));
  }

  postMessage(message: P, transfer: Transferable[] = []):void {
    this.worker.self.postMessage(message, transfer);
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
