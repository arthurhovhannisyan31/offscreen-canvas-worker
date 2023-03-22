import { PerformanceCanvasCalculator } from "./fps-canvas-calculator";
import { PerformanceCanvasDrawer } from "./fps-canvas-drawer";
import { type SetDataAction } from "./types";
import { createAction, WORKER_START, WORKER_STOP } from "../../../common";
import { ModuleStatus, type WorkerActivityStatus } from "../../../common/types";
import { isHTMLCanvasElement, isSAB } from "../../../typeGuards";
import { AbstractModule } from "../../abstract-modules/abstract-module";
import { FPS_MODULE_SET_DATA, FPS_MODULE_START, FPS_MODULE_STOP, WORKER_LOG_FPS_STATUS } from "../../actions";

export type UpdateAction = SetDataAction;
export type SendAction = Action<any>;

export class PerformanceCanvasModule extends AbstractModule<UpdateAction, SendAction> {
  protected canvasDrawer: PerformanceCanvasDrawer;
  protected status = ModuleStatus.DISABLED;

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
      if (this.status !== ModuleStatus.ACTIVE) return;

      this.canvasDrawer.draw();
      this.rafLoop();
    });
  };

  postActiveStatus(): void{
    const statusPayload: WorkerActivityStatus = {
      status: this.status,
      timestamp: performance.now(),
      message: `FPS worker status: ${this.status}`
    };
    this.postMessage(createAction(
      WORKER_LOG_FPS_STATUS,
      statusPayload
    ));
  }

  async onMessage(action: UpdateAction): Promise<void> {
    switch (action.type){
      case FPS_MODULE_SET_DATA: {
        if (isHTMLCanvasElement(action.payload.canvas)){
          this.canvasDrawer.setContext(action.payload.canvas);
        }
        if (isSAB(action.payload.fpsSAB)){
          this.canvasDrawer.calculator?.init({
            timeOrigin: action.payload.timeOrigin,
            fpsSAB: action.payload.fpsSAB
          });
        }
        break;
      }
      case WORKER_START:
      case FPS_MODULE_START: {
        if (this.status === ModuleStatus.ACTIVE) return;

        this.status = ModuleStatus.ACTIVE;
        this.rafLoop();
        this.postActiveStatus();
        break;
      }
      case WORKER_STOP:
      case FPS_MODULE_STOP:{
        if (this.status === ModuleStatus.DISABLED) return;

        this.status = ModuleStatus.DISABLED;
        this.postActiveStatus();
        break;
      }
      default: break;
    }
  }
}
