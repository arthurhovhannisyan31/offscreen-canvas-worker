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
export type PostAction = SimpleAction;

export class SatelliteCanvasModule extends AbstractModule<UpdateAction, PostAction> {
  canvasManager = new SatelliteCanvasDrawer();

  constructor(postMessage: PostMessage<PostAction>) {
    super(postMessage);
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
          this.postMessage(createSimpleAction(SATELLITE_DRAW_DONE));
        }
        break;
      }
      default: break;
    }
  }
}
