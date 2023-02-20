import { type AbstractCanvasCalculator } from "../calculators";

export abstract class AbstractCanvasDrawer {
  previewCtx: CanvasRenderingContext2D | null = null;
  calculator: AbstractCanvasCalculator | null = null;

  setContext(message: Message<HTMLCanvasElement>):void {
    const canvas = message.data;
    this.previewCtx = canvas.getContext("2d");
  }

  abstract draw(image: Message<File|ImageData>): Promise<void>;
}
