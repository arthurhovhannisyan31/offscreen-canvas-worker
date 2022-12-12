export default class WorkerManager<T> {
  worker: Worker;

  constructor(
    url: string,
    messageHandler: Worker["onmessage"],
    errorHandler: Worker["onerror"],
    options?: WorkerOptions,
  ) {
    this.worker = new Worker(url, {
      type: "module",
      credentials: "include",
      ...options
    });
    this.worker.onerror = errorHandler ?? this.onError;
    this.worker.onmessage = messageHandler ?? this.onMessage;
  }

  postMessage(message: T, transfer: Transferable[] = []): void {
    this.worker.postMessage(message, transfer);
  }

  onMessage(): void {
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
