import { FpsCanvasManager } from "./fps-canvas-manager";
import { isHTMLCanvasElement } from "../../../typeGuards";
import { type CanvasAction } from "../../../types";
import { AbstractModule } from "../../abstract-modules/abstract-module";
import { FPS_MODULE_SET_CONTEXT } from "../../actions";

export type PostAction = Action<unknown>;
export type UpdateAction = CanvasAction; // Action<unknown> |

export class FpsCanvasModule extends AbstractModule<UpdateAction> {
  canvasManager: FpsCanvasManager;

  constructor(postMessage: Worker["postMessage"]) {
    super(postMessage);

    this.canvasManager = new FpsCanvasManager();
  }

  async onMessage({ data }: Message<UpdateAction>): Promise<void> {
    const fn = (): void => {
      requestAnimationFrame(() => {
        console.log(performance.now());
        fn();
      });
    };
    fn();
    // get mark for performance and store it to queue
    // store range of measures
    // search for measures in the 1 second scope by first index
    // reassign splice array by first entry, cut first elements out of 1 sec range
    // show count of measures
    switch (data.type){
      case FPS_MODULE_SET_CONTEXT: {
        if (isHTMLCanvasElement(data.payload)){
          this.canvasManager.setContext(data.payload);
        }
      }
    }
  }
}
