import type { CanvasAction } from "../../../types";

import {
  createAction,
  MAIN_DRAW_REQUEST,
  MAIN_SET_CONTEXT,
  MAIN_IMAGE_DATA_DONE,
  AbstractWorker,
} from "../../../common";
import { MainCanvasDrawer } from "../../../common/drawers";
import { isHTMLCanvasElement, isImageFile } from "../../../typeGuards";

class MainCanvasWorker extends AbstractWorker<CanvasAction> {
  canvasDrawer: MainCanvasDrawer;

  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);

    this.canvasDrawer = new MainCanvasDrawer();
  }

  processData = (): void => {
    if (this.canvasDrawer.previewCtx){
      const imageData = this.canvasDrawer.getImageData();
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
        if (isHTMLCanvasElement(data.payload.data)){
          this.canvasDrawer.setContext(data.payload.data);
        }
        break;
      }
      case MAIN_DRAW_REQUEST: {
        if (isImageFile(data.payload)){
          await this.canvasDrawer.draw(data.payload);
          this.processData();
        }
        break;
      }
    }
  }
}

new MainCanvasWorker(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
