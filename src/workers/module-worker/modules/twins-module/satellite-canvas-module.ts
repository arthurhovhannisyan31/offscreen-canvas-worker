import type { CanvasAction } from "../../../types";

import {
  createMessage,
  createSimpleAction,
  SATELLITE_DRAW_DONE,
  SATELLITE_DRAW_REQUEST,
  SATELLITE_SET_CONTEXT
} from "../../../common";
import { SatelliteCanvasDrawer } from "../../../common/drawers";
import { isHTMLCanvasElement, isImageBitmapSource } from "../../../typeGuards";
import { AbstractModule } from "../../abstract-modules/abstract-module";

export class SatelliteCanvasModule extends AbstractModule<CanvasAction> {
  canvasManager = new SatelliteCanvasDrawer();

  constructor(postMessage: Worker["postMessage"]) {
    super(postMessage);
  }

  onMessage({ data }: Message<CanvasAction>): void {
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
          this.postMessage(createMessage(
            createSimpleAction(SATELLITE_DRAW_DONE)
          ));
        }
        break;
      }
    }
  }
}
