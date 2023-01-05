import type { CanvasMessage } from "../../types";

import {
  createAction,
  MAIN_DRAW_DONE,
  MAIN_DRAW_REQUEST,
  MAIN_IMAGE_DATA_DONE,
  MAIN_SET_CONTEXT,
  SATELLITE_DRAW_REQUEST,
  SATELLITE_SET_CONTEXT,
} from "../../common";
import { AbstractSubjectModule } from "../abstract-modules/abstract-subject-module";
import { MainOffscreenModule } from "./main-offscreen-module";
import { SatelliteOffscreenModule } from "./satellite-offscreen-module";

export type UpdateAction = Action<CanvasMessage>;
export type PostAction = Action<unknown>;

export class CanvasManagerModule extends AbstractSubjectModule<UpdateAction>{

  constructor(postMessage: Worker["postMessage"]) {
    super(postMessage);

    this.fetchData();
  }

  async fetchData(): Promise<void> {
    const response = await fetch("https://picsum.photos/300/150");
    const blob = await response.blob();
    const file = new File([blob], "my_image.png",{ type:"image/jpeg", lastModified:new Date().getTime() });

    this.notifyObservers(createAction(MAIN_DRAW_REQUEST, { data: file }));
    setTimeout(() => {
      this.fetchData();
    }, 1000);
  }

  notifyObservers(action: UpdateAction): void {
    this.subject.notify(createAction(action.type, action.payload));
  }

  update = (action: UpdateAction): void => {
    switch (action.type){
      case MAIN_SET_CONTEXT: {
        this.subject.addObserver(new MainOffscreenModule(this.update));
        this.notifyObservers(action);
        break;
      }
      case SATELLITE_SET_CONTEXT: {
        this.subject.addObserver(new SatelliteOffscreenModule(this.update));
        this.notifyObservers(action);
        break;
      }
      case MAIN_DRAW_DONE: {
        performance.mark("mark-end-main-canvas");
        break;
      }
      case MAIN_IMAGE_DATA_DONE: {
        this.subject.notify(createAction(SATELLITE_DRAW_REQUEST, action.payload ));
        break;
      }
      default:{
        this.notifyObservers(action);
      }
    }
  };
}
