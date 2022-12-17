import {
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_INIT,
  PROCESS_IMAGE_DATA_DONE,
  PROCESS_IMAGE_DATA_REQUEST,
} from "workers/common/actions/actions";
import { createAction } from "workers/common/actions/createAction";
import Subject from "workers/common/observer/subject";

import type { CanvasManagerMessageType } from "./canvas-manager-types";

import CanvasWorkerManager from "./canvas-worker-manager";
import ProcessImageWorkerManager from "./process-image-worker-manager";
import SatelliteCanvasWorkerManager from "./satellite-canvas-worker-manager";
import { isArrayBufferViewMessage } from "./typeGuards";

export default class CanvasManager {
  mainCanvasWorker: CanvasWorkerManager;
  processImageWorker: ProcessImageWorkerManager;
  subject = new Subject();

  constructor(
    mainCanvas: HTMLCanvasElement,
  ) {
    this.mainCanvasWorker = new CanvasWorkerManager(
      "../workers/first-offscreen-worker",
      this._onMessage,
      this._onError,
      mainCanvas,
      MAIN_INIT
    );

    this.processImageWorker = new ProcessImageWorkerManager(
      "../workers/process-image-worker",
      this._onMessage,
      this._onError
    );
  }

  addObserver(
    url: string,
    canvas: HTMLCanvasElement,
    initAction: string
  ): number {
    const workerManager = new SatelliteCanvasWorkerManager(
      url,
      this._onMessage,
      this._onError,
      canvas,
      initAction
    );

    return this.subject.addObserver(workerManager);
  }

  processImageFile(file: File): void {
    this.mainCanvasWorker.postMessage(
      createAction(MAIN_DRAW_REQUEST, { data: file })
    );
  }

  // CanvasWorkerAction
  _onMessage = ({ data }: CanvasManagerMessageType): void => {
    switch (data.type) {
      case MAIN_IMAGE_DATA_DONE: {
        if (isArrayBufferViewMessage(data)){
          this.processImageWorker.postMessage(
            createAction(PROCESS_IMAGE_DATA_REQUEST, {
              data: data.payload.data,
              alpha: 0.5,
            }),
            [data.payload.data.data.buffer]
          );
        }
        break;
      }
      case PROCESS_IMAGE_DATA_DONE: {
        if (isArrayBufferViewMessage(data)){
          this.subject.notify(data.payload.data);
          break;
        }
      }
    }
  };
  _onError(this: AbstractWorker, ev: ErrorEvent): void {
    // eslint-disable-next-line no-console
    console.log(ev.error);
  }
}
