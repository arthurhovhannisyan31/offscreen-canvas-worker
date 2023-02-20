import type { CanvasAction } from "../../../types";

import {
  createSimpleAction,
  SATELLITE_DRAW_DONE,
  SATELLITE_DRAW_REQUEST,
  SATELLITE_SET_CONTEXT,
  AbstractWorker,
} from "../../../common";
import { SatelliteCanvasDrawer } from "../../../common/drawers";
import { isHTMLCanvasElement, isImageBitmapSource } from "../../../typeGuards";

class SatelliteOffscreen extends AbstractWorker<CanvasAction> {
  canvasManager = new SatelliteCanvasDrawer();

  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
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
          this.worker.postMessage(createSimpleAction(SATELLITE_DRAW_DONE));
        }
        break;
      }
    }
  }
}

new SatelliteOffscreen(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
