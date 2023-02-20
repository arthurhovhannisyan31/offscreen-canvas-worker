import { AbstractCanvasCalculator } from "../../../common/calculators";

export class FpsCanvasCalculator extends AbstractCanvasCalculator {
  DOMHighResTimeStamps: number[] = [];

  calculate(): number {
    // get mark for performance and store it to queue
    // store range of measures
    // search for measures in the 1 second scope by first index
    // reassign splice array by first entry, cut first elements out of 1 sec range
    // show count of measures
    const cur = performance.now();
    const lenght = this.DOMHighResTimeStamps.length;
    let idx = -1;

    for (let i = lenght-1; i >= 0 ; i--) {
      if (cur -  this.DOMHighResTimeStamps[i] > 1000){
        idx = i;
        break;
      }
    }

    this.DOMHighResTimeStamps = this.DOMHighResTimeStamps.slice(idx);

    this.DOMHighResTimeStamps.push(cur);

    return this.DOMHighResTimeStamps.length;
  }
}
