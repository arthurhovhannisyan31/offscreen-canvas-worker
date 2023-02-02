import type { ArrayBufferViewMessage } from "../types";

import { createAction } from "../../common";
import { PROCESS_IMAGE_DATA_REQUEST } from "../actions";
import WorkerManager from "../managers/worker-manager";

export interface ProcessImageMessage extends Message<ImageData>{
  alpha: number
}

export type ProcessImageWorkerManagerAction = Action<ProcessImageMessage>;

export default class ProcessImageWorkerManager
  extends WorkerManager<ProcessImageWorkerManagerAction> {
  constructor(
    worker: Worker,
    messageHandler: Worker["onmessage"],
    errorHandler: Worker["onerror"],
  ) {
    super(worker, messageHandler, errorHandler);
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
