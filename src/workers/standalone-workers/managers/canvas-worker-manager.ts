import { isSafari } from "../../../helpers";
import { createAction } from "../../common";
import WorkerManager from "../managers/worker-manager";

export type CanvasWorkerManagerAction = Action<Message<File>> | SimpleAction;

export type CanvasWorkerManagerProps = ConstructorParameters<typeof CanvasWorkerManager>

export default class CanvasWorkerManager extends WorkerManager<CanvasWorkerManagerAction> {
  constructor(
    worker: Worker,
    messageHandler: Worker["onmessage"],
    errorHandler: Worker["onerror"],
    canvasRef: HTMLCanvasElement,
    initActionName: string
  ) {
    super(worker, messageHandler, errorHandler);
    this.transferControl(canvasRef, initActionName);
  }

  transferControl(
    canvasRef: HTMLCanvasElement,
    initAction: string
  ): void {
    if (!isSafari(navigator)){
      const canvasControl = canvasRef.transferControlToOffscreen();
      this.worker.postMessage(
        createAction(initAction, {
          data: canvasControl,
        }),
        [canvasControl]
      );
    }
  }
}
