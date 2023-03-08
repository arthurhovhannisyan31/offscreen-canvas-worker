import { AbstractModule } from "./abstract-module";
import { Subject } from "../../common";

export abstract class AbstractSubjectModule<U, P> extends AbstractModule<U, P>{
  subject = new Subject<P>();

  protected constructor(
    postAction: PostAction<P>,
    postMessage: PostMessage<P>
  ) {
    super(postAction, postMessage);
  }
}
