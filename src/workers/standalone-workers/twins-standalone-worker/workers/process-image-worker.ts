import {
  createAction,
  processImageData,
  AbstractWorker
} from "../../../common";
import { PROCESS_IMAGE_DATA_DONE, PROCESS_IMAGE_DATA_REQUEST } from "../actions";

export interface ProcessImageMessage extends Message<ImageData> {
  alpha: number;
}

export type ProcessImageAction = Action<ProcessImageMessage>;

class ProcessImageWorker extends AbstractWorker<ProcessImageAction> {
  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
  }

  processImageData(payload: ProcessImageMessage): void {
    processImageData(payload.data);
    this.worker.postMessage(
      createAction(PROCESS_IMAGE_DATA_DONE, {
        data: payload.data,
      }),
      [payload.data.data.buffer]
    );
  }

  onMessage({ data }: Message<ProcessImageAction>): void {
    switch (data.type) {
      case PROCESS_IMAGE_DATA_REQUEST: {
        this.processImageData(data.payload);
        break;
      }
    }
  }
}

new ProcessImageWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
