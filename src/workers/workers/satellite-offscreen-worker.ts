import {
  createSimpleAction,
  SECOND_DRAW_DONE,
  SECOND_DRAW_REQUEST,
  SECOND_INIT,
} from "workers/common/actions";
import { drawToCanvas } from "workers/common/helpers";

import type { CanvasWorkerAction, CanvasWorkerDrawMessage } from "./types";

import AbstractCanvasWorker from "./abstract-canvas-worker";
import { isHTMLCanvasElement, isImageBitmapSource } from "./typeGuards";

class SatelliteOffscreen extends AbstractCanvasWorker {
  constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
  }

  async draw(payload: CanvasWorkerDrawMessage): Promise<void> {
    drawToCanvas(this.previewCtx, payload.data);
    this.worker.postMessage(createSimpleAction(SECOND_DRAW_DONE));
  }

  onMessage = ({ data }: Message<CanvasWorkerAction>): void => {
    switch (data.type) {
      case SECOND_INIT: {
        if (isHTMLCanvasElement(data.payload)){
          this.setContext(data.payload);
        }
        break;
      }
      case SECOND_DRAW_REQUEST: {
        if (isImageBitmapSource(data.payload)){
          this.draw(data.payload);
        }
        break;
      }
    }
  };
}

new SatelliteOffscreen(self as DedicatedWorkerGlobalScope);

export default {} as DedicatedWorker;
