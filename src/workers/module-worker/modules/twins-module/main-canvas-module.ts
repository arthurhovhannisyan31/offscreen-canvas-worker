import type { CanvasAction } from "../../../types";

import {
  createAction,
  MAIN_DRAW_REQUEST, MAIN_IMAGE_DATA_DONE,
  MAIN_SET_CONTEXT,
} from "../../../common";
import { MainCanvasDrawer } from "../../../common/drawers";
import { isHTMLCanvasElement, isImageFile } from "../../../typeGuards";
import { AbstractModule } from "../../abstract-modules/abstract-module";

export type UpdateAction = CanvasAction;
export type PostAction = CanvasAction;

export class MainCanvasModule extends AbstractModule<UpdateAction, PostAction> {
  canvasManager: MainCanvasDrawer;

  constructor(postMessage: PostMessage<PostAction>) {
    super(postMessage);

    this.canvasManager = new MainCanvasDrawer();
  }

  processData = (): void => {
    if (this.canvasManager.previewCtx){
      const imageData = this.canvasManager.getImageData();
      this.postMessage(createAction(MAIN_IMAGE_DATA_DONE, imageData as ImageData));
    }
  };

  async onMessage(data: UpdateAction): Promise<void> {
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
