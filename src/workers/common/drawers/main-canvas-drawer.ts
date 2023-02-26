import { AbstractCanvasDrawer } from "./abstract-canvas-drawer";
import { drawImage } from "../helpers";

export class MainCanvasDrawer extends AbstractCanvasDrawer {
  constructor() {
    super();
  }

  async draw(payload: File): Promise<void> {
    const bitMap = await createImageBitmap(payload);
    drawImage(this.previewCtx, bitMap);
  }

  getImageData(): ImageData | void{
    if (this.previewCtx){
      return this.previewCtx.getImageData(0, 0, this.previewCtx.canvas.width, this.previewCtx.canvas.height);
    }
  }
}
