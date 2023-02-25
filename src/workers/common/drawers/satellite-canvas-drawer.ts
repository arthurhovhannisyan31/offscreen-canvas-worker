import { AbstractCanvasDrawer } from "./abstract-canvas-drawer";
import { processImageData, putImageData } from "../helpers";

export class SatelliteCanvasDrawer extends AbstractCanvasDrawer {
  async draw(payload: ImageData): Promise<void> {
    putImageData(this.previewCtx, payload);
  }

  processImageData(message: ImageData): void {
    processImageData(message);
    this.draw(message);
  }

}
