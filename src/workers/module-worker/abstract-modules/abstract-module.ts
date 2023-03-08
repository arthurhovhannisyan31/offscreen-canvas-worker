import type { Observer } from "../../common";

export abstract class AbstractModule<U, A, M> implements Observer<U>{
  protected constructor(
    protected postAction: PostAction<A>,
    protected postMessage: PostMessage<M>
  ) {}

  update = (message: U): void => {
    this.onMessage(message);
  };

  abstract onMessage(message: U): void;
}
