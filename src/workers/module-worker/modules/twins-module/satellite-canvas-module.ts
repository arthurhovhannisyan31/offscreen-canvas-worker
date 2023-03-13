import type { CanvasAction } from "../../../types";

import {
  createSimpleAction,
  SATELLITE_DRAW_DONE,
  SATELLITE_DRAW_REQUEST,
  SATELLITE_SET_CONTEXT
} from "../../../common";
import { SatelliteCanvasDrawer } from "../../../common/drawers";
import { isHTMLCanvasElement, isImageBitmapSource } from "../../../typeGuards";
import { AbstractModule } from "../../abstract-modules/abstract-module";

export type UpdateAction = CanvasAction;
export type SendAction = SimpleAction;

export class SatelliteCanvasModule extends AbstractModule<UpdateAction, SendAction> {
  canvasManager = new SatelliteCanvasDrawer();

  constructor(
    postAction: PostAction<SendAction>,
    postMessage: PostMessage<SendAction>
  ) {
    super(postAction, postMessage);
  }

  onMessage(data: CanvasAction): void {
    switch (data.type) {
      case SATELLITE_SET_CONTEXT: {
        if (isHTMLCanvasElement(data.payload)){
          this.canvasManager.setContext(data.payload);
        }
        break;
      }
      case SATELLITE_DRAW_REQUEST: {
        if (isImageBitmapSource(data.payload)){
          this.canvasManager.processImageData(data.payload);
          this.postAction(createSimpleAction(SATELLITE_DRAW_DONE));
        }
        break;
      }
      default: break;
    }
  }
}
