import { type Observer, Subject } from "../../common";

export class AbstractSubjectModule<T> implements Observer<T>{
  subject = new Subject();

  update(message: T): void {
    this.subject.notify(message);
  }
}
