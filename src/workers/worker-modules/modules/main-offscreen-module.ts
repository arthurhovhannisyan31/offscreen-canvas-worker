import type { CanvasAction, ProcessFileMessage } from "../../types";

import {
  createAction,
  createSimpleAction,
  drawMainCanvasBitMap,
  MAIN_DRAW_DONE,
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_SET_CONTEXT,
} from "../../common";
import { isHTMLCanvasElement, isImageFile } from "../../typeGuards";
import { AbstractCanvasModule } from "../abstract-modules/abstract-canvas-module";

export class MainOffscreenModule extends AbstractCanvasModule {
  constructor(postMessage: Worker["postMessage"]) {
    super(postMessage);
  }

  async draw({ data }: ProcessFileMessage): Promise<void>{
    const bitMap = await createImageBitmap(data);
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

  update({ data }: Message<CanvasAction>): void {
    switch (data.type) {
      case MAIN_SET_CONTEXT: {
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
