import { AbstractCanvasDrawer } from "./abstract-canvas-drawer";
import { drawImage } from "../helpers";

export class MainCanvasDrawer extends AbstractCanvasDrawer {
  constructor() {
    super();
  }

  async draw(payload: Message<File>): Promise<void> {
    const bitMap = await createImageBitmap(payload.data);
    drawImage(this.previewCtx, bitMap);
  }

  getImageData(): ImageData | void{
    if (this.previewCtx){
      return this.previewCtx.getImageData(0, 0, this.previewCtx.canvas.width, this.previewCtx.canvas.height);
    }
  }
}
