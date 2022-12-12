import type { CanvasMessage } from "./types"

import {
  MAIN_DRAW_DONE,
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_INIT,
  PROCESS_IMAGE_DATA_DONE,
  PROCESS_IMAGE_DATA_REQUEST,
  SECOND_DRAW_DONE,
} from "../common/actions/actions";
import { createAction } from "../common/actions/createAction";
import Subject from "../common/observer/subject";
import CanvasWorkerManager from "./canvas-worker-manager";
import ProcessImageWorkerManager from "./process-image-worker-manager";
import SecondaryCanvasWorkerManager from "./secondary-canvas-worker-manager";

export default class CanvasManager {
  mainCanvasWorker: CanvasWorkerManager;
  processImageWorker: ProcessImageWorkerManager;
  subject = new Subject();

  constructor(
    mainCanvas: HTMLCanvasElement,
  ) {
    this.mainCanvasWorker = new CanvasWorkerManager(
      "./workers/first-offscreen.js",
      mainCanvas,
      this._onMessage,
      this._onError,
      MAIN_INIT
    );

    this.processImageWorker = new ProcessImageWorkerManager(
      this._onMessage,
      this._onError
    );

  }

  addObserver(
    url: string,
    canvas: HTMLCanvasElement,
    initAction: string
  ): number {
    const workerManager = new SecondaryCanvasWorkerManager(
      url,
      canvas,
      this._onMessage,
      this._onError,
      initAction
    );
    return this.subject.addObserver(workerManager);
  }

  processImageFile(file: File): void {
    this.mainCanvasWorker.postMessage(
      createAction(MAIN_DRAW_REQUEST, { data: file })
    );
  }

  _onMessage = ({ data: { type, payload } }:CanvasMessage): void => {
    switch (type) {
      case MAIN_DRAW_DONE: {
        performance.mark("mark-end-main-canvas");
        break;
      }
      case MAIN_IMAGE_DATA_DONE: {
        this.processImageWorker.postMessage(
          createAction(PROCESS_IMAGE_DATA_REQUEST, {
            data: payload.data,
            alpha: 0.5,
          }),
          [payload.data.data.buffer]
        );
        break;
      }
      case PROCESS_IMAGE_DATA_DONE: {
        this.subject.notify(payload.data);
        break;
      }
      case SECOND_DRAW_DONE: {
        performance.mark("mark-end-second-canvas");
      }
    }
  };
  _onError(this: AbstractWorker, ev: ErrorEvent): void {
    // eslint-disable-next-line no-console
    console.log(ev.error);
  }
}
