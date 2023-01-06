import type { Observer } from "./types";

export class Subject<T> {
  observers: Set<Observer<T>> = new Set();

  addObserver(observer: Observer<T>): void {
    this.observers.add(observer);
  }

  removeObserver(observer: Observer<T>): void {
    this.observers.delete(observer);
  }

  notify(message: T): void {
    this.observers.forEach((observer) => observer.update(message));
  }
}
