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

import mainCanvasWorker from "../workers/first-offscreen-worker?worker&url";
import processImageWorker from "../workers/process-image-worker?worker&url";
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
      mainCanvasWorker,
      this.#onMessage,
      this.#onError,
      mainCanvas,
      MAIN_INIT
    );

    this.processImageWorker = new ProcessImageWorkerManager(
      processImageWorker,
      this.#onMessage,
      this.#onError
    );

    this.fetchImage();
  }

  addObserver(
    url: string,
    canvas: HTMLCanvasElement,
    initAction: string
  ): number {
    const workerManager = new SatelliteCanvasWorkerManager(
      url,
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
