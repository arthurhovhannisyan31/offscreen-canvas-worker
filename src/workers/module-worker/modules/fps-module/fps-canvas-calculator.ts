import { AbstractCanvasCalculator } from "../../../common/calculators";

export class FpsCanvasCalculator extends AbstractCanvasCalculator<never, void, SharedArrayBuffer> {
  sab?: SharedArrayBuffer;
  times: number[] = [];

  init(sab: SharedArrayBuffer): void{
    this.sab = sab;
  }

  calculate(): number {
    if (!this.sab) return 0;

    const arr = new Int32Array(this.sab);

    return arr.findIndex((val) => val === 0);
  }
}
