import type { Observer } from "./types";

import ObserverList from "./observer-list.js";

export default class Subject<T> {
  observers = new ObserverList();

  addObserver(observer: Observer<T>): number {
    return this.observers.add(observer);
  }

  removeObserver(observer: Observer<T>): void {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
  }

  notify(context: T): void {
    const observerCount = this.observers.count();
    for (let i = 0; i < observerCount; i++) {
      this.observers.get(i)?.update(context);
    }
  }
}
