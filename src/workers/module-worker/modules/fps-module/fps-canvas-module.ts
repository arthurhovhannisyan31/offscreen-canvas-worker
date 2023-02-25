import { FpsCanvasCalculator } from "./fps-canvas-calculator";
import { FpsCanvasDrawer } from "./fps-canvas-drawer";
import { type SetDataAction } from "./types";
import { isHTMLCanvasElement } from "../../../typeGuards";
import { AbstractModule } from "../../abstract-modules/abstract-module";
import { FPS_MODULE_SET_DATA, FPS_MODULE_START, FPS_MODULE_STOP } from "../../actions";

export type PostAction = never;
export type UpdateAction = SetDataAction; // Action<unknown> |

export class FpsCanvasModule extends AbstractModule<UpdateAction, Message<PostAction>> {
  canvasDrawer: FpsCanvasDrawer;
  active = false;

  constructor(postMessage: PostMessage<Message<PostAction>>) {
    super(postMessage);

    this.canvasDrawer = new FpsCanvasDrawer(
      new FpsCanvasCalculator()
    );
  }

  rafLoop = (): void => {
    requestAnimationFrame(() => {
      if (this.active){
        this.canvasDrawer.draw();
        this.rafLoop();
      }
    });
  };

  async onMessage(data: UpdateAction): Promise<void> {
    switch (data.type){
      case FPS_MODULE_SET_DATA: {
        if (isHTMLCanvasElement(data.payload.canvas)){
          this.canvasDrawer.setContext(data.payload.canvas);
          const arr = new Int32Array(data.payload.fpsSAB);
          console.log(arr);
        }
        break;
      }
      case FPS_MODULE_START: {
        this.active = true;
        this.rafLoop();
        break;
      }
      case FPS_MODULE_STOP: {
        this.active = false;
        break;
      }
    }
  }
}
