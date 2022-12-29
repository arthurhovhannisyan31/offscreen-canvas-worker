import type { Observer } from "./types";

import { ObserverList } from "./observer-list";

export class Subject<T> {
  observers = new ObserverList();

  addObserver(observer: Observer<T>): number {
    return this.observers.add(observer);
  }

  removeObserver(observer: Observer<T>): void {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
  }

  notify(data: T): void {
    //     this.observers.forEach((observer) => observer.update());
    // make observers request data rather than get
    const observerCount = this.observers.count();
    for (let i = 0; i < observerCount; i++) {
      this.observers.get(i)?.update(data);
    }
  }
}
