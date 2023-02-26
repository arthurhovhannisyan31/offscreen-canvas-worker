import { type AbstractCanvasCalculator } from "../calculators";

export abstract class AbstractCanvasDrawer {
  previewCtx: CanvasRenderingContext2D | null = null;
  calculator: AbstractCanvasCalculator | null = null;

  setContext(canvas: HTMLCanvasElement):void {
    this.previewCtx = canvas.getContext("2d");
  }

  abstract draw(image: File|ImageData): Promise<void>;
}
