import type { CanvasAction } from "../../types";

import {
  MAIN_DRAW_REQUEST,
  MAIN_SET_CONTEXT,
  AbstractWorker, createAction, MAIN_IMAGE_DATA_DONE,
} from "../../common";
import { MainCanvasManager } from "../../common/managers";
import { isHTMLCanvasElement, isImageFile } from "../../typeGuards";

class MainCanvasWorker extends AbstractWorker<CanvasAction> {
  canvasManager: MainCanvasManager;

  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);

    this.canvasManager = new MainCanvasManager();
  }

  processData = (): void => {
    if (this.canvasManager.previewCtx){
      const imageData = this.canvasManager.getImageData();
      if (imageData){
        this.worker.postMessage(
          createAction(MAIN_IMAGE_DATA_DONE, {
            data: imageData,
          }),
          [imageData.data.buffer]
        );
      }
    }
  };

  async onMessage({ data }: Message<CanvasAction>): Promise<void> {
    switch (data.type) {
      case MAIN_SET_CONTEXT: {
        if (isHTMLCanvasElement(data.payload)){
          this.canvasManager.setContext(data.payload);
        }
        break;
      }
      case MAIN_DRAW_REQUEST: {
        if (isImageFile(data.payload)){
          await this.canvasManager.draw(data.payload);
          this.processData();
        }
        break;
      }
    }
  }
}

new MainCanvasWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
