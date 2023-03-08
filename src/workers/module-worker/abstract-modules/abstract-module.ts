import type { Observer } from "../../common";

export abstract class AbstractModule<U, P> implements Observer<U>{
  protected constructor(
    protected postAction: PostAction<P>,
    protected postMessage: PostMessage<P>
  ) {}

  update = (message: U): void => {
    this.onMessage(message);
  };

  abstract onMessage(message: U): void;
}
