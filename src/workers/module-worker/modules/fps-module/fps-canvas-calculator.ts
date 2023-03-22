import { getAdjustedPerformanceTimeStamp } from "./helpers";
import { type SetDataPayload } from "./types";
import { AbstractCanvasCalculator } from "../../../common/calculators";

type TT = Pick<SetDataPayload, "fpsSAB" | "timeOrigin">;

const TIMESTAMPS_DIFF_THRESHOLD = 20;

export class PerformanceCanvasCalculator
  extends AbstractCanvasCalculator<never, void, TT> {
  fpsSharedArr?: Int32Array;
  mtTimeOrigin = 0;
  timestamps: number[] = [];
  /*
  * set start pointer to track position of first entry in 1000 ms range
  * set end pointer to track position for data insertion
  * */
  pointerStart = 0;
  pointerEnd = 0;
  fpsValue = 0;

  init({ timeOrigin, fpsSAB }: TT): void {
    this.fpsSharedArr = new Int32Array(fpsSAB);
    this.mtTimeOrigin = timeOrigin;
  }

  calculate(): number {
    if (!this.fpsSharedArr || this.fpsSharedArr[0] === 1) return this.fpsValue;

    /*
    * performance.now returns float value, need to floor to it store as i32
    * */
    const cur = Math.floor(
      getAdjustedPerformanceTimeStamp(
        performance.now(),
        performance.timeOrigin,
        this.mtTimeOrigin
      )
    );

    if (this.pointerEnd !== 0) {
      /*
      * lookup for first element in 1000 ms range from current timestamp
      * */
      for (let i = 0; i < this.pointerEnd; i++) {
        if (this.timestamps[i] >= cur - 1000){
          this.pointerStart = i;
          break;
        }
      }
    }

    /*
    * write current timestamp to end pointer next section
    * */
    if (cur - Math.floor(this.fpsSharedArr[1]) <= TIMESTAMPS_DIFF_THRESHOLD) {
      this.timestamps[this.pointerEnd++]= cur;
    }

    if (this.pointerStart > 0) {
      this.timestamps.copyWithin(0, this.pointerStart, this.pointerEnd);
      this.timestamps.splice(this.pointerEnd - this.pointerStart);

      this.pointerEnd = this.pointerEnd - this.pointerStart ;
      this.pointerEnd = Math.max(this.pointerEnd, 0);

      if (this.pointerEnd === 0){
        this.timestamps.splice(0);
        this.pointerStart = this.pointerEnd;
      }
    }

    this.fpsValue = this.timestamps.length;

    return this.fpsValue;
  }
}
