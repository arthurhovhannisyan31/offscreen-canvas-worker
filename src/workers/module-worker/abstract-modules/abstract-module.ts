import { type Observer } from "../../common";

export abstract class AbstractModule<T, P> implements Observer<T>{
  constructor(protected postMessage: PostMessage<P>) {}

  update = (message: T): void => {
    this.onMessage(message);
  };

  abstract onMessage(message: T): void;
}
