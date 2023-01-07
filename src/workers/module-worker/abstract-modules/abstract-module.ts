import { type Observer } from "../../common";

export abstract class AbstractModule<T> implements Observer<Message<T>>{
  constructor(protected postMessage: Worker["postMessage"]) {}

  update = (val: Message<T>): void => {
    this.onMessage(val);
  };

  abstract onMessage(val: Message<T>): void;
}
