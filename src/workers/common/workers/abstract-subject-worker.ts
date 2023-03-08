import { AbstractWorker } from "./abstract-worker";
import { Subject } from "../observer";

export abstract class AbstractSubjectWorker<U extends Message, A> extends AbstractWorker<A> {
  subject = new Subject<A>();

  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
  }

  abstract init(): void;

  onMessage(message: U): void {
    this.messageBatcher.batchMessage(message, (message: U) => {
      this.subject.notify(message.data);
    });
  }
}
