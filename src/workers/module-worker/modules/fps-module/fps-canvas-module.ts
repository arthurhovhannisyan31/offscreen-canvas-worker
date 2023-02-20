import { FpsCanvasCalculator } from "./fps-canvas-calculator";
import { FpsCanvasDrawer } from "./fps-canvas-drawer";
import { isHTMLCanvasElement } from "../../../typeGuards";
import { type CanvasAction } from "../../../types";
import { AbstractModule } from "../../abstract-modules/abstract-module";
import { FPS_MODULE_SET_CONTEXT, FPS_MODULE_START, FPS_MODULE_STOP } from "../../actions";

export type PostAction = Action<unknown>;
export type UpdateAction = CanvasAction; // Action<unknown> |

export class FpsCanvasModule extends AbstractModule<UpdateAction> {
  canvasManager: FpsCanvasDrawer;
  active = false;

  constructor(postMessage: Worker["postMessage"]) {
    super(postMessage);

    this.canvasManager = new FpsCanvasDrawer(
      new FpsCanvasCalculator()
    );
  }

  raf = (): void => {
    requestAnimationFrame(() => {
      if (this.active){
        this.canvasManager.draw();
        this.raf();
      }
    });
  };

  async onMessage({ data }: Message<UpdateAction>): Promise<void> {
    switch (data.type){
      case FPS_MODULE_SET_CONTEXT: {
        if (isHTMLCanvasElement(data.payload)){
          this.canvasManager.setContext(data.payload);
        }
        break;
      }
      case FPS_MODULE_START: {
        this.active = true;
        this.raf();
        break;
      }
      case FPS_MODULE_STOP: {
        this.active = false;
        break;
      }
    }
  }
}
