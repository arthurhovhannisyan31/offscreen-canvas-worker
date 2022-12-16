import {
  createAction, createSimpleAction,
  MAIN_DRAW_DONE,
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_INIT,
} from "workers/common/actions";
import { drawMainCanvasBitMap } from "workers/common/helpers";

import type { CanvasWorkerAction } from "./types";

import AbstractCanvasWorker from "./abstract-canvas-worker";
import { isHTMLCanvasElement, isImageBitmapSource } from "./typeCheck";
import { type CanvasWorkerDrawMessage } from "./types";

class FirstOffscreen extends AbstractCanvasWorker {
  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
  }

  async draw(payload: CanvasWorkerDrawMessage): Promise<void> {
    const bitMap = await createImageBitmap(payload.data);
    drawMainCanvasBitMap(this.previewCtx, bitMap);
    this.postMessage(createSimpleAction(MAIN_DRAW_DONE));
    this.processImageData();
  }

  processImageData(): void {
    if (this.previewCtx){
      const imageData = this.previewCtx.getImageData(0, 0, 400, 400);
      this.postMessage(
        createAction(MAIN_IMAGE_DATA_DONE, {
          data: imageData,
        }),
        [imageData.data.buffer]
      );
    }
  }

  onMessage = ({ data }: Message<CanvasWorkerAction>): void => {
    switch (data.type) {
      case MAIN_INIT: {
        if (isHTMLCanvasElement(data.payload)){
          this.setContext(data.payload);
        }
        break;
      }
      case MAIN_DRAW_REQUEST: {
        if (isImageBitmapSource(data.payload)){
          this.draw(data.payload);
        }
        break;
      }
    }
  };
}

new FirstOffscreen(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
