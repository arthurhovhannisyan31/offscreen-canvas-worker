export class WaitingGroup {
  public _sab: SharedArrayBuffer;
  private _wg: Int32Array;

  constructor(initial: number, opt_sab?: SharedArrayBuffer) {
    this._sab = opt_sab || new SharedArrayBuffer(4);
    this._wg = new Int32Array(this._sab);
    this.add(initial);
  }

  static connect(wg: WaitingGroup): WaitingGroup {
    return new WaitingGroup(0, wg._sab);
  }

  add(num: number): void{
    const cur = num + Atomics.add(this._wg, 0, num);
    if (cur < 0){
      throw new Error("Waiting is in incosistent state: negative count.");
    }
    if (cur > 0){
      return;
    }
    Atomics.notify(this._wg, 0);
  }

  done():void{
    this.add(-1);
  }

  wait(): void{
    // eslint-disable-next-line no-constant-condition
    while(true){
      const count = Atomics.load(this._wg, 0);
      if (count === 0){
        return;
      }
      if (Atomics.wait(this._wg, 0 , count) === "ok"){
        return;
      }
    }
  }
}
