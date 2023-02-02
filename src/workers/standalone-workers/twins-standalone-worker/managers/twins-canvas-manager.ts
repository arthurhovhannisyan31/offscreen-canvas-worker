import type { CanvasManagerMessageType } from "./twins-canvas-manager-types";

import MainCanvasWorkerManager from "./main-canvas-worker-manager";
import ProcessImageWorkerManager from "./process-image-worker-manager";
import SatelliteCanvasWorkerManager from "./satellite-canvas-worker-manager";
import { debounce, isSafari } from "../../../../helpers";
import {
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_SET_CONTEXT,
  createAction,
  Subject,
} from "../../../common";
import { PROCESS_IMAGE_DATA_DONE, PROCESS_IMAGE_DATA_REQUEST } from "../actions";
import { isArrayBufferViewMessage } from "../typeGuards";
import MainCanvasWorker from "../workers/main-canvas-worker?worker";
import ProcessImageWorker from "../workers/process-image-worker?worker";

export default class TwinsCanvasManager {
  protected mainCanvasWorker: MainCanvasWorkerManager;
  protected processImageWorker: ProcessImageWorkerManager;
  protected subject = new Subject();
  protected runningState = false;
  protected timerId: ReturnType<typeof setTimeout> | null = null;
  protected debouncedFetch: () => void;

  constructor(
    mainCanvas: HTMLCanvasElement,
  ) {
    this.mainCanvasWorker = new MainCanvasWorkerManager(
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

    this.debouncedFetch = debounce(this.#fetchData.bind(this), 100);
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
    if (!this.runningState) return;

    // TODO get size from passed canvas reference
    const response = await fetch("https://picsum.photos/400/250");
    const blob = await response.blob();
    const file = new File([blob], "my_image.png",{ type:"image/jpeg", lastModified:new Date().getTime() });
    this.mainCanvasWorker.postMessage(
      createAction(MAIN_DRAW_REQUEST, { data: file })
    );
    this.timerId = setTimeout(() => {
      this.#fetchData();
    }, 2000);
  }

  clearTimers(): void {
    if (this.timerId){
      clearTimeout(this.timerId);
    }
  }

  public start = (): void => {
    this.runningState ||= true;
    this.debouncedFetch();
  };

  public stop = (): void => {
    this.runningState = false;
    this.clearTimers();
  };

  #onMessage = ({ data }: CanvasManagerMessageType): void => {
    switch (data.type) {
      case MAIN_IMAGE_DATA_DONE: {
        if (isArrayBufferViewMessage(data)){
          if (isSafari(navigator)){
            //
          } else {
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
