export default class WorkerManager<T> {
  protected worker: Worker;

  constructor(
    worker: Worker,
    messageHandler: Worker["onmessage"],
    errorHandler: Worker["onerror"],
  ) {
    this.worker = worker;
    this.worker.onerror = errorHandler ?? this.onError;
    this.worker.onmessage = messageHandler ?? this.onMessage;
  }

  postMessage(message: T, transfer: Transferable[] = []): void {
    this.worker.postMessage(message, transfer);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  onMessage(_: Message<T>): void {
    throw new Error("onMessage not implemented!");
  }

  onError(): void {
    throw new Error("onError not implemented!");
  }

  terminate(): void {
    this.worker.onerror = null;
    this.worker.onmessage = null;
    this.worker.terminate();
  }
}
