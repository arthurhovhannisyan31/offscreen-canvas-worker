import { type FpsCanvasCalculator } from "./fps-canvas-calculator";
import { AbstractCanvasDrawer } from "../../../common/drawers";

export class FpsCanvasDrawer extends AbstractCanvasDrawer {
  constructor(calculator: FpsCanvasCalculator) {
    super();
    this.calculator = calculator;
  }

  async draw(): Promise<void>{
    const data = this.calculator?.calculate();
    console.log(data);
  }
}
