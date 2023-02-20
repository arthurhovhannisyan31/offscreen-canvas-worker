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
    const length = this.DOMHighResTimeStamps.length;
    let idx = -1;

    for (let i = length-1; i >= 0 ; i--) {
      if (cur -  this.DOMHighResTimeStamps[i] > 1000){
        idx = i - 1;
        break;
      }
    }

    this.DOMHighResTimeStamps.splice(0, idx);

    const framesCount = this.DOMHighResTimeStamps.length;

    this.DOMHighResTimeStamps.push(cur);

    return framesCount;
  }
}
