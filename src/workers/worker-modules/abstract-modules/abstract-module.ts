import { type Observer } from "../../common";

export class AbstractModule<T> implements Observer<T>{
  update(val: T): void {
    console.log(val);
  }
}
