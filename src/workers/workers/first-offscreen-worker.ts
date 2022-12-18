import type { CanvasWorkerAction } from "./types";

import {
  createAction, createSimpleAction,
  MAIN_DRAW_DONE,
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_INIT,
} from "../common/actions";
import { drawMainCanvasBitMap } from "../common/helpers";
import AbstractCanvasWorker from "./abstract-canvas-worker";
import { isHTMLCanvasElement, isImageFile } from "./typeGuards";
import { type CanvasWorkerDrawMessage } from "./types";

class FirstOffscreenWorker extends AbstractCanvasWorker {
  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
  }

  async draw(payload: CanvasWorkerDrawMessage): Promise<void> {
    const bitMap = await createImageBitmap(payload.data);
    drawMainCanvasBitMap(this.previewCtx, bitMap);
    this.worker.postMessage(createSimpleAction(MAIN_DRAW_DONE));
    this.processImageData();
  }

  processImageData(): void {
    if (this.previewCtx){
      const imageData = this.previewCtx.getImageData(0, 0, 400, 400);
      this.worker.postMessage(
        createAction(MAIN_IMAGE_DATA_DONE, {
          data: imageData,
        }),
        [imageData.data.buffer]
      );
    }
  }

  processMessage({ data }: Message<CanvasWorkerAction>): void {
    switch (data.type) {
      case MAIN_INIT: {
        if (isHTMLCanvasElement(data.payload)){
          this.setContext(data.payload);
        }
        break;
      }
      case MAIN_DRAW_REQUEST: {
        if (isImageFile(data.payload)){
          this.draw(data.payload);
        }
        break;
      }
    }
  }
}

new FirstOffscreenWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
