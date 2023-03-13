import { it, describe, expect, jest } from "@jest/globals";

import { AbstractModule } from "../../../module-worker/abstract-modules/abstract-module";
import { Subject } from "../../observer";
import { AbstractWorker } from "../abstract-worker";

const mockFn = jest.fn();

class SomeModule extends AbstractModule<any, any>{
  constructor(postAction: any, postMessage: any) {
    super(postAction, postMessage);
  }

  onMessage(action: any): void{
    console.log(action);
    mockFn(action);
  }
}

class SomeWorker extends AbstractWorker<any>{
  subject = new Subject<any>();

  constructor(props: any) {
    super(props);
    this.init();
    this.onMessage = this.onMessage.bind(this);
  }
  onMessage(message: Message): void {
    console.log("SomeWorker message", message);
    this.messageBatcher.batchMessage(message,(message: Message) => {
      this.subject.notify(message.data);
    });
  }
  init(): void{
    this.subject.addObserver(new SomeModule(this.onMessage, this.postMessage));
  }
}

export const Instance = new SomeWorker({ self:{} });

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("AbstractWorker", () => {
  it("runs 1 task in the 50 ms time range", () => {
    // Instance.onMessage({ data: "1" });
    Instance.onMessage({ data: "2" });
    Instance.onMessage({ data: "3" });
    jest.advanceTimersByTime(40);
    console.log(mockFn.mock.calls);
    Instance.onMessage({ data: "4" });
    Instance.onMessage({ data: "5" });
    jest.advanceTimersByTime(40);
    console.log(mockFn.mock.calls);

    jest.runAllTimers();

    expect(1).toEqual(1);
  });
});
