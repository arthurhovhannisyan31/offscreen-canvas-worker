import type { CanvasAction } from "../../types";

import {
  createSimpleAction,
  SATELLITE_DRAW_DONE,
  SATELLITE_DRAW_REQUEST,
  SATELLITE_SET_CONTEXT,
  putImageData,
} from "../../common";
import { isHTMLCanvasElement, isImageBitmapSource } from "../../typeGuards";
import { AbstractCanvasWorker } from "./abstract-canvas-worker";

class SatelliteOffscreen extends AbstractCanvasWorker {
  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
  }

  async draw(payload: Message<ImageData>): Promise<void> {
    putImageData(this.previewCtx, payload.data);
    this.worker.postMessage(createSimpleAction(SATELLITE_DRAW_DONE));
  }

  processMessage({ data }: Message<CanvasAction>): void {
    switch (data.type) {
      case SATELLITE_SET_CONTEXT: {
        if (isHTMLCanvasElement(data.payload)){
          this.setContext(data.payload);
        }
        break;
      }
      case SATELLITE_DRAW_REQUEST: {
        if (isImageBitmapSource(data.payload)){
          this.draw(data.payload);
        }
        break;
      }
    }
  }
}

new SatelliteOffscreen(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
