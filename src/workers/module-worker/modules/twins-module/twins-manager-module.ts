import type { PostAction, UpdateAction } from "./types";

import { MainCanvasModule  } from "./main-canvas-module";
import { SatelliteCanvasModule } from "./satellite-canvas-module";
import { debounce } from "../../../../helpers";
import {
  createAction,
  MAIN_DRAW_DONE,
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_SET_CONTEXT,
  SATELLITE_DRAW_REQUEST,
  SATELLITE_SET_CONTEXT, WORKER_STOP,
} from "../../../common";
import { AbstractSubjectModule } from "../../abstract-modules/abstract-subject-module";
import { TWINS_WORKER_STOP, TWINS_WORKER_START } from "../../actions";

export class TwinsManagerModule extends AbstractSubjectModule<UpdateAction, Message<PostAction>>{
  protected runningState = false;
  protected timerId: ReturnType<typeof setTimeout> | null = null;
  protected debouncedFetch: () => void;

  constructor(postMessage: PostMessage<Message<PostAction>>) {
    super(postMessage);

    this.debouncedFetch = debounce(this.fetchData.bind(this), 100);
  }

  async fetchData(): Promise<void> {
    if (!this.runningState) return;

    const response = await fetch("https://picsum.photos/320/200");
    const blob = await response.blob();
    const file = new File([blob], "my_image.png",{ type:"image/jpeg", lastModified:new Date().getTime() });

    this.notifyObservers(
      createAction(MAIN_DRAW_REQUEST, file)
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

  notifyObservers(action: UpdateAction): void {
      this.subject.notify(
        createAction(action.type, action.payload)
      );
  }

  onMessage = (message: UpdateAction): void => {
    switch (message.type){
      case TWINS_WORKER_START: {
        this.runningState ||= true;
        this.debouncedFetch();
        break;
      }
      case WORKER_STOP:
      case TWINS_WORKER_STOP: {
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
            createAction(SATELLITE_DRAW_REQUEST, message.payload )
          );
        break;
      }
      default: {
        this.notifyObservers(message);
      }
    }
  };
}
