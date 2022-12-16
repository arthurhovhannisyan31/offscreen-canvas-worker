import type { BoxedArrayBufferView } from "./types";

import WorkerManager from "../managers/worker-manager";

interface ProcessImageWorkerMessage {
  data: BoxedArrayBufferView
  alpha: number
}

export default class ProcessImageWorkerManager extends WorkerManager<Action<ProcessImageWorkerMessage>> {
  constructor(
    messageHandler: Worker["onmessage"],
    errorHandler: Worker["onerror"],
  ) {
    super("./workers/process-image-worker", messageHandler, errorHandler);
  }

  processImageData(imageData: BoxedArrayBufferView, alpha: number): void {
    this.worker.postMessage({ imageData, alpha }, [imageData.data.buffer]);
  }
}
