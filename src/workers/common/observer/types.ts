export interface Observer<T> {
  update(val: T): void;
}
