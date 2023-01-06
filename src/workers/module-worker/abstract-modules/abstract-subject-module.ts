import { Subject } from "../../common";
import { AbstractModule } from "./abstract-module";

export abstract class AbstractSubjectModule<T> extends AbstractModule<T>{
  subject = new Subject<T>();

  protected constructor(postMessage: Worker["postMessage"]) {
    super(postMessage);
  }
}
