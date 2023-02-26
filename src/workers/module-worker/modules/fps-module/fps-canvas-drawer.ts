import { type FpsCanvasCalculator } from "./fps-canvas-calculator";
import { AbstractCanvasDrawer } from "../../../common/drawers";

export class FpsCanvasDrawer extends AbstractCanvasDrawer {
  fpsValue = 0;
  time = performance.now();

  constructor(calculator: FpsCanvasCalculator) {
    super();
    this.calculator = calculator;
  }

  async draw(): Promise<void>{
    const ctx = this.previewCtx;
    if (!ctx) return;

    const data = this.calculator?.calculate();

    if (this.fpsValue === data) return;

    this.fpsValue = data;

    const curTime = performance.now();

    if (curTime - this.time <= 100) return;

    this.time = curTime;

    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const label = "FPS:";
    const valueOffset = ctx.measureText(label).width ?? 100;

    ctx.font = "24px serif";
    this.drawText(ctx, "FPS:", 40, 50);

    ctx.font = "32px serif";
    this.drawText(ctx, `${data}`, 40 + valueOffset, 50);
  }

  drawText(ctx: CanvasRenderingContext2D, value: string, x: number, y: number): void {
    ctx.fillText(value, x, y);
  }
}
