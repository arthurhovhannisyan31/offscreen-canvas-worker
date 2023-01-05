import { type Observer } from "../../common";

export abstract class AbstractModule<T> implements Observer<T>{
  constructor(protected postMessage: Worker["postMessage"]) {}

  abstract update(val: T): void;
}
