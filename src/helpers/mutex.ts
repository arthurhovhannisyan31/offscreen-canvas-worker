export enum Lock {
  UNLOCKED,
  LOCKED ,
}

export class Mutex {
  public _sab: SharedArrayBuffer;
  #mutex: Int32Array;

  constructor(sab?: SharedArrayBuffer) {
    this._sab = sab || new SharedArrayBuffer(4);
    this.#mutex = new Int32Array(this._sab);
  }

  static connect(mutex: Mutex): Mutex {
    return new Mutex(mutex._sab);
  }

  lock (): void {
    console.log("before while");
    // eslint-disable-next-line no-constant-condition
    while(true){
      if (Atomics.compareExchange(this.#mutex, 0, Lock.UNLOCKED, Lock.LOCKED) === Lock.UNLOCKED) {
        break;
      }
      Atomics.wait(this.#mutex, 0, Lock.LOCKED);
    }
    console.log("after a while");
  }

  unlock(): void {
    if (Atomics.compareExchange(this.#mutex, 0, Lock.LOCKED, Lock.UNLOCKED) !== Lock.LOCKED){
      throw new Error("Mutex in in inconsistent state: unlock on unlocked Mutex");
    }
    Atomics.notify(this.#mutex, 0, 1);
  }
}
