import { AbstractModule } from "./abstract-module";
import { Subject } from "../../common";

export abstract class AbstractSubjectModule<U, A, M> extends AbstractModule<U, A, M>{
  subject = new Subject<A>();

  protected constructor(
    postAction: PostAction<A>,
    postMessage: PostMessage<M>
  ) {
    super(postAction, postMessage);
  }
}
