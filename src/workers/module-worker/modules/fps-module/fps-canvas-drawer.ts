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
    const data = this.calculator?.calculate();

    if (this.fpsValue === data) return;

    this.fpsValue = data;

    const curTime = performance.now();

    if (curTime - this.time <= 100) return;

    this.time = curTime;

    const ctx = this.previewCtx;

    if (ctx){
      const canvasWidth = ctx.canvas.width;
      const canvasHeight = ctx.canvas.height;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "red";
      ctx.font = "48px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(data, canvasWidth/2, canvasHeight/2);
    }
  }
}
