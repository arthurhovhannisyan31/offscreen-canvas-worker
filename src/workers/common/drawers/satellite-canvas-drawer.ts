import { AbstractCanvasDrawer } from "./abstract-canvas-drawer";
import { processImageData, putImageData } from "../helpers";

export class SatelliteCanvasDrawer extends AbstractCanvasDrawer {
  async draw(payload: Message<ImageData>): Promise<void> {
    putImageData(this.previewCtx, payload.data);
  }

  processImageData(message: Message<ImageData>): void {
    processImageData(message.data);
    this.draw(message);
  }

}
