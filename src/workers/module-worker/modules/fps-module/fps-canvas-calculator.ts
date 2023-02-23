import { AbstractCanvasCalculator } from "../../../common/calculators";

export class FpsCanvasCalculator extends AbstractCanvasCalculator {
  times: number[] = [];

  calculate(): number {
    const cur = performance.now();
    const length = this.times.length;
    let idx = -1;

    for (let i = length-1; i >= 0 ; i--) {
      if (this.times[i] < cur - 1000){
        idx = i;
        break;
      }
    }

    this.times.push(cur);

    this.times.splice(0, idx);

    return this.times.length;
  }
}
