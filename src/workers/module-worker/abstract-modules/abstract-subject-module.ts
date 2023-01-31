import { AbstractModule } from "./abstract-module";
import { Subject } from "../../common";

export abstract class AbstractSubjectModule<T> extends AbstractModule<T>{
  subject = new Subject<Message<T>>();

  protected constructor(postMessage: Worker["postMessage"]) {
    super(postMessage);
  }
}
