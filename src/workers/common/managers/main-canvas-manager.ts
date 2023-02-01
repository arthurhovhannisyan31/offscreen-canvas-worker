import { AbstractCanvasManager } from "./abstract-canvas-manager";
import { drawImage } from "../helpers";

export class MainCanvasManager extends AbstractCanvasManager {
  constructor() {
    super();
  }

  async draw(payload: Message<File>): Promise<void> {
    const bitMap = await createImageBitmap(payload.data);
    drawImage(this.previewCtx, bitMap);
  }

  getImageData(): ImageData | void{
    if (this.previewCtx){
      return this.previewCtx.getImageData(0, 0, 300, 150);
    }
  }
}
