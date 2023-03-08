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
export type SendAction = CanvasAction;
export type SendMessage = Message<any>;

export class MainCanvasModule extends AbstractModule<UpdateAction, SendAction, SendMessage> {
  canvasManager: MainCanvasDrawer;

  constructor(
    postAction: PostAction<SendAction>,
    postMessage: PostMessage<SendMessage>
  ) {
    super(postAction, postMessage);

    this.canvasManager = new MainCanvasDrawer();
  }

  processData = (): void => {
    if (this.canvasManager.previewCtx){
      const imageData = this.canvasManager.getImageData();
      this.postAction(createAction(MAIN_IMAGE_DATA_DONE, imageData as ImageData));
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
      default: break;
    }
  }
}
