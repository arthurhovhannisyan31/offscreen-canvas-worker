import { MainCanvasModule } from "./main-canvas-module";
import { SatelliteCanvasModule } from "./satellite-canvas-module";
import { debounce } from "../../../helpers";
import {
  createAction,
  MAIN_DRAW_DONE,
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_SET_CONTEXT, MODULE_WORKER_START,
  MODULE_WORKER_STOP,
  SATELLITE_DRAW_REQUEST,
  SATELLITE_SET_CONTEXT,
} from "../../common";
import { createMessage } from "../../common/actions/createMessage";
import { type CanvasAction } from "../../types";
import { AbstractSubjectModule } from "../abstract-modules/abstract-subject-module";

export type UpdateAction = CanvasAction;
export type PostAction = Action<unknown>;

export class CanvasManagerModule extends AbstractSubjectModule<UpdateAction>{
  protected runningState = false;
  protected timerId: ReturnType<typeof setTimeout> | null = null;
  protected debouncedFetch: () => void;

  constructor(postMessage: Worker["postMessage"]) {
    super(postMessage);

    this.debouncedFetch = debounce(this.fetchData.bind(this), 100);
  }

  async fetchData(): Promise<void> {
    if (!this.runningState) return;

    const response = await fetch("https://picsum.photos/300/150");
    const blob = await response.blob();
    const file = new File([blob], "my_image.png",{ type:"image/jpeg", lastModified:new Date().getTime() });

    this.notifyObservers(
      createMessage(createAction(MAIN_DRAW_REQUEST, { data: file }))
    );
    this.timerId = setTimeout(() => {
      this.fetchData();
    }, 2000);
  }

  clearTimers(): void {
    if (this.timerId){
      clearTimeout(this.timerId);
    }
  }

  notifyObservers({ data }: Message<UpdateAction>): void {
    this.subject.notify(
      createMessage(createAction(data.type, data.payload))
    );
  }

  onMessage = (message: Message<UpdateAction>): void => {
    switch (message.data.type){
      case MODULE_WORKER_START: {
        this.runningState ||= true;
        this.debouncedFetch();
        break;
      }
      case MODULE_WORKER_STOP: {
        this.runningState = false;
        this.clearTimers();
        break;
      }
      case MAIN_SET_CONTEXT: {
        this.subject.addObserver(new MainCanvasModule(this.onMessage));
        this.notifyObservers(message);
        break;
      }
      case SATELLITE_SET_CONTEXT: {
        this.subject.addObserver(new SatelliteCanvasModule(this.onMessage));
        this.notifyObservers(message);
        break;
      }
      case MAIN_DRAW_DONE: {
        performance.mark("mark-end-main-canvas");
        break;
      }
      case MAIN_IMAGE_DATA_DONE: {
        this.subject.notify(
          createMessage(createAction(SATELLITE_DRAW_REQUEST, message.data.payload ))
        );
        break;
      }
      default:{
        this.notifyObservers(message);
      }
    }
  };
}
