import type { CanvasAction } from "../../types";

import {
  createAction,
  createSimpleAction,
  drawImage,
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

  async draw({ data }: Message<File>): Promise<void>{
    const bitMap = await createImageBitmap(data);
    drawImage(this.previewCtx, bitMap);
    this.postMessage(createSimpleAction(MAIN_DRAW_DONE));
    this.processImageData();
  }

  processImageData(): void {
    if (this.previewCtx){
      // TODO get from main thread
      const imageData = this.previewCtx.getImageData(0, 0, 300, 150);
      this.postMessage(
        createAction(MAIN_IMAGE_DATA_DONE, { data: imageData })
      );
    }
  }

  update( action: CanvasAction): void {
    switch (action.type) {
      case MAIN_SET_CONTEXT: {
        if (isHTMLCanvasElement(action.payload)){
          this.setContext(action.payload);
        }
        break;
      }
      case MAIN_DRAW_REQUEST: {
        if (isImageFile(action.payload)){
          this.draw(action.payload);
        }
        break;
      }
    }
  }
}
