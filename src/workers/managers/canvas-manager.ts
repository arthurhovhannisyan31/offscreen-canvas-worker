import type { CanvasManagerMessageType } from "./canvas-manager-types";

import {
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_INIT,
  PROCESS_IMAGE_DATA_DONE,
  PROCESS_IMAGE_DATA_REQUEST,
  createAction
} from "../common/actions";
import Subject from "../common/observer/subject";
import MainCanvasWorker from "../workers/first-offscreen-worker?worker";
import ProcessImageWorker from "../workers/process-image-worker?worker";
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
      new MainCanvasWorker(),
      this.#onMessage,
      this.#onError,
      mainCanvas,
      MAIN_INIT
    );

    this.processImageWorker = new ProcessImageWorkerManager(
      new ProcessImageWorker(),
      this.#onMessage,
      this.#onError
    );

    this.fetchImage();
  }

  addObserver(
    worker: Worker,
    canvas: HTMLCanvasElement,
    initAction: string
  ): number {
    const workerManager = new SatelliteCanvasWorkerManager(
      worker,
      this.#onMessage,
      this.#onError,
      canvas,
      initAction
    );

    return this.subject.addObserver(workerManager);
  }

  async fetchImage(): Promise<void> {
    const response = await fetch("https://picsum.photos/300/150");
    const blob = await response.blob();
    const file = new File([blob], "my_image.png",{ type:"image/jpeg", lastModified:new Date().getTime() });
    this.mainCanvasWorker.postMessage(
      createAction(MAIN_DRAW_REQUEST, { data: file })
    );
  }

  #onMessage = ({ data }: CanvasManagerMessageType): void => {
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
  #onError = (ev: ErrorEvent): void => {
    // eslint-disable-next-line no-console
    console.log("onError", ev.error);
  };
}
