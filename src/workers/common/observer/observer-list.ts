import type { Observer } from "./types";

export class ObserverList<T> {
  #observerList: Observer<T>[] = [];

  add(obj: Observer<T>): number {
    return this.#observerList.push(obj);
  }

  count(): number {
    return this.#observerList.length;
  }

  get(index: number): Observer<T> | undefined {
    if (index > -1 && index < this.#observerList.length) {
      return this.#observerList[index];
    }

    return;
  }

  indexOf(obj: Observer<T>, startIndex = 0): number {
    const i = startIndex;

    while (i < this.#observerList.length) {
      if (this.#observerList[i] === obj) return i;
    }

    return -1;
  }

  removeAt(index: number): void {
    this.#observerList.splice(index, 1);
  }
}
