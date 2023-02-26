import { AbstractModule } from "./abstract-module";
import { Subject } from "../../common";

export abstract class AbstractSubjectModule<T, P> extends AbstractModule<T, P>{
  subject = new Subject<T>();

  protected constructor(postMessage: PostMessage<P>) {
    super(postMessage);
  }
}
