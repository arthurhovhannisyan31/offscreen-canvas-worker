import { type Observer } from "../../common";

export abstract class AbstractModule<T> implements Observer<T>{
  constructor(protected postMessage: Worker["postMessage"]) {}

  update = (val: T): void => {
    this.onMessage(val);
  };

  abstract onMessage(val: T): void;
}
