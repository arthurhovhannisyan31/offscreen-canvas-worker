import type { ArrayBufferViewMessage } from "./types";

import { createAction, PROCESS_IMAGE_DATA_REQUEST } from "../common/actions";
import WorkerManager from "../managers/worker-manager";

export interface ProcessImageWorkerMessage extends Message<ImageData>{
  alpha: number
}

export type ProcessImageWorkerManagerAction = Action<ProcessImageWorkerMessage>;

export default class ProcessImageWorkerManager
  extends WorkerManager<ProcessImageWorkerManagerAction> {
  constructor(
    url: string,
    messageHandler: Worker["onmessage"],
    errorHandler: Worker["onerror"],
  ) {
    super(url, messageHandler, errorHandler);
  }

  processImageData(imageData: ArrayBufferViewMessage, alpha: number): void {
    this.worker.postMessage(
      createAction(
        PROCESS_IMAGE_DATA_REQUEST,
        { imageData, alpha }
      ),
      [imageData.data.buffer]
    );
  }
}
