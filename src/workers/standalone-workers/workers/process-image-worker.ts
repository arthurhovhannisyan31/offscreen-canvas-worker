import {
  createAction,
  PROCESS_IMAGE_DATA_DONE,
  PROCESS_IMAGE_DATA_REQUEST,
  processImageData,
  AbstractWorker
} from "../../common";

interface ProcessImageWorkerMessage extends Message<ImageData> {
  alpha: number;
}

export type ProcessImageWorkerAction = Action<ProcessImageWorkerMessage>;

class ProcessImageWorker extends AbstractWorker<ProcessImageWorkerAction> {
  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
  }

  processImageData(payload: ProcessImageWorkerMessage): void {
    processImageData(payload.data);
    this.worker.postMessage(
      createAction(PROCESS_IMAGE_DATA_DONE, {
        data: payload.data,
      }),
      [payload.data.data.buffer]
    );
  }

  processMessage({ data }: Message<ProcessImageWorkerAction>): void {
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
