import { processImageData, putImageData } from "../helpers";
import { AbstractCanvasManager } from "./abstract-canvas-manager";

export class SatelliteCanvasManager extends AbstractCanvasManager {
  async draw(payload: Message<ImageData>): Promise<void> {
    putImageData(this.previewCtx, payload.data);
  }

  processImageData(message: Message<ImageData>): void {
    processImageData(message.data);
    this.draw(message);
  }

}
