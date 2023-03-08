import { PerformanceCanvasCalculator } from "./fps-canvas-calculator";
import { PerformanceCanvasDrawer } from "./fps-canvas-drawer";
import { type SetDataAction } from "./types";
import { createSimpleAction, WORKER_START, WORKER_STOP } from "../../../common";
import { isHTMLCanvasElement, isSAB } from "../../../typeGuards";
import { AbstractModule } from "../../abstract-modules/abstract-module";
import { FPS_MODULE_SET_DATA, FPS_MODULE_START, FPS_MODULE_STOP } from "../../actions";

export type UpdateAction = SetDataAction;
export type SendAction = Action<any>;

export class PerformanceCanvasModule extends AbstractModule<UpdateAction, SendAction> {
  canvasDrawer: PerformanceCanvasDrawer;
  active = false;

  constructor(
    postAction: PostAction<SendAction>,
    postMessage: PostMessage<SendAction>
  ) {
    super(postAction, postMessage);

    this.canvasDrawer = new PerformanceCanvasDrawer(
      new PerformanceCanvasCalculator()
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

  postActiveStatus(): void{
    this.postMessage(createSimpleAction(
      `fps worker status: ${this.active}`
    ));
  }

  async onMessage(action: UpdateAction): Promise<void> {
    switch (action.type){
      case FPS_MODULE_SET_DATA: {
        if (isHTMLCanvasElement(action.payload.canvas)){
          this.canvasDrawer.setContext(action.payload.canvas);
        }
        if (isSAB(action.payload.fpsSAB)){
          this.canvasDrawer.calculator?.init(action.payload.fpsSAB);
        }
        break;
      }
      case WORKER_START:
      case FPS_MODULE_START: {
        this.active = true;
        this.rafLoop();
        this.postActiveStatus();
        break;
      }
      case WORKER_STOP:
      case FPS_MODULE_STOP:{
        this.active = false;
        this.postActiveStatus();
        break;
      }
      default: break;
    }
  }
}
