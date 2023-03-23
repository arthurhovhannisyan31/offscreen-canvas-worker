import { type AbstractCanvasCalculator } from "../calculators";

export abstract class AbstractCanvasDrawer<C = AbstractCanvasCalculator> {
  previewCtx: CanvasRenderingContext2D | null = null;
  calculator: C | null = null;

  setContext(canvas: HTMLCanvasElement):void {
    this.previewCtx = canvas.getContext("2d");
  }

  abstract draw(image: File|ImageData): Promise<void>;
}
