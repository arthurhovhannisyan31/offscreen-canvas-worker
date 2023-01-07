import type { CanvasAction } from "../../types";

import {
  createSimpleAction,
  putImageData,
  processImageData,
  SATELLITE_DRAW_DONE,
  SATELLITE_DRAW_REQUEST,
  SATELLITE_SET_CONTEXT
} from "../../common";
import { isHTMLCanvasElement, isImageBitmapSource } from "../../typeGuards";
import { AbstractCanvasModule } from "../abstract-modules/abstract-canvas-module";

export class SatelliteOffscreenModule extends AbstractCanvasModule {
  constructor(postMessage: Worker["postMessage"]) {
    super(postMessage);
  }

  async draw(payload: Message<ImageData>): Promise<void> {
    putImageData(this.previewCtx, payload.data);
    this.postMessage(createSimpleAction(SATELLITE_DRAW_DONE));
  }

  processImageData(message: Message<ImageData>): void {
    processImageData(message.data);
    this.draw(message);
  }

  onMessage(action: CanvasAction): void {
    switch (action.type) {
      case SATELLITE_SET_CONTEXT: {
        if (isHTMLCanvasElement(action.payload)){
          this.setContext(action.payload);
        }
        break;
      }
      case SATELLITE_DRAW_REQUEST: {
        if (isImageBitmapSource(action.payload)){
          this.processImageData(action.payload);
        }
        break;
      }
    }
  }
}
