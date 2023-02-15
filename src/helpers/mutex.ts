export enum Lock {
  UNLOCKED,
  LOCKED ,
}

export class Mutex {
  public _sab: SharedArrayBuffer;
  #mutex: Int32Array;
  name: string;

  constructor(sab?: SharedArrayBuffer, name?: string) {
    this._sab = sab || new SharedArrayBuffer(4);
    this.#mutex = new Int32Array(this._sab);
    this.name = name || "";
  }

  static connect(mutex: Mutex, name = ""): Mutex {
    return new Mutex(mutex._sab, name);
  }

  lock (): void {
    console.log("before while");
    // eslint-disable-next-line no-constant-condition
    while(true){
      if (Atomics.compareExchange(this.#mutex, 0, Lock.UNLOCKED, Lock.LOCKED) === Lock.UNLOCKED) {
        console.log(`${this.name} locked`);
        break;
      }
      console.log(`${this.name} was already locked, waiting for unlock`);
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
