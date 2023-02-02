import BaseWorkerManager from "./base-worker-manager";
import { isSafari } from "../../../../helpers";
import { createAction } from "../../../common";

export type CanvasWorkerManagerAction = Action<Message<File>> | SimpleAction;

export type CanvasWorkerManagerProps = ConstructorParameters<typeof MainCanvasWorkerManager>

export default class MainCanvasWorkerManager extends BaseWorkerManager<CanvasWorkerManagerAction> {
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
