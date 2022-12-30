import type { CanvasAction, ProcessImageMessage } from "../../types";

import {
  createSimpleAction,
  drawToCanvas,
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

  async draw(payload: ProcessImageMessage): Promise<void> {
    drawToCanvas(this.previewCtx, payload.data);
    this.postMessage(createSimpleAction(SATELLITE_DRAW_DONE));
  }

  processImageData(message: ProcessImageMessage): void {
    processImageData(message.data);
    this.draw(message);
  }

  update({ data }: Message<CanvasAction>): void {
    switch (data.type) {
      case SATELLITE_SET_CONTEXT: {
        if (isHTMLCanvasElement(data.payload)){
          this.setContext(data.payload);
        }
        break;
      }
      case SATELLITE_DRAW_REQUEST: {
        if (isImageBitmapSource(data.payload)){
          this.processImageData(data.payload);
        }
        break;
      }
    }
  }
}
