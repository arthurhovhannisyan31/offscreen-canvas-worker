import { AbstractWorker } from "./abstract-worker";
import { Subject } from "../observer";

export abstract class AbstractSubjectWorker<P, U> extends AbstractWorker<P> {
  subject = new Subject<U>();

  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
    this.init();
  }

  abstract init(): void;

  onMessage(message: Message): void {
    this.messageBatcher.batchMessage(message, (message: Message) => {
      this.subject.notify(message.data);
    });
  }
}
