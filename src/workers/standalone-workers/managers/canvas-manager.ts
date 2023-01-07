import type { CanvasManagerMessageType } from "./canvas-manager-types";

import { isSafari } from "../../../helpers";
import {
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_SET_CONTEXT,
  PROCESS_IMAGE_DATA_DONE,
  PROCESS_IMAGE_DATA_REQUEST,
  createAction,
  Subject
} from "../../common";
import { isArrayBufferViewMessage } from "../typeGuards";
import MainCanvasWorker from "../workers/main-canvas-worker?worker";
import ProcessImageWorker from "../workers/process-image-worker?worker";
import CanvasWorkerManager from "./canvas-worker-manager";
import ProcessImageWorkerManager from "./process-image-worker-manager";
import SatelliteCanvasWorkerManager from "./satellite-canvas-worker-manager";

export default class CanvasManager {
  protected mainCanvasWorker: CanvasWorkerManager;
  protected processImageWorker: ProcessImageWorkerManager;
  protected subject = new Subject();

  constructor(
    mainCanvas: HTMLCanvasElement,
  ) {
    this.mainCanvasWorker = new CanvasWorkerManager(
      new MainCanvasWorker(),
      this.#onMessage,
      this.#onError,
      mainCanvas,
      MAIN_SET_CONTEXT
    );

    this.processImageWorker = new ProcessImageWorkerManager(
      new ProcessImageWorker(),
      this.#onMessage,
      this.#onError
    );

    this.#fetchData();
  }

  addObserver(
    worker: Worker,
    canvas: HTMLCanvasElement,
    initAction: string
  ): void {
    const workerManager = new SatelliteCanvasWorkerManager(
      worker,
      this.#onMessage,
      this.#onError,
      canvas,
      initAction
    );

    this.subject.addObserver(workerManager);
  }

  async #fetchData(): Promise<void> {
    const response = await fetch("https://picsum.photos/300/150");
    const blob = await response.blob();
    const file = new File([blob], "my_image.png",{ type:"image/jpeg", lastModified:new Date().getTime() });
    this.mainCanvasWorker.postMessage(
      createAction(MAIN_DRAW_REQUEST, { data: file })
    );
    setTimeout(() => {
      this.#fetchData();
    }, 1000);
  }

  #onMessage = ({ data }: CanvasManagerMessageType): void => {
    switch (data.type) {
      case MAIN_IMAGE_DATA_DONE: {
        if (isArrayBufferViewMessage(data)){
          if (isSafari(navigator)){
            //
          } else {
            // send to SatelliteDirectly
            this.processImageWorker.postMessage(
              createAction(PROCESS_IMAGE_DATA_REQUEST, {
                data: data.payload.data,
                alpha: data.payload.alpha,
              }),
              [data.payload.data.data.buffer]
            );
          }
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
