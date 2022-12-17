import { createAction } from "../common/actions";
import WorkerManager from "../managers/worker-manager";

export type CanvasWorkerManagerAction = Action<Message<File>>;

export type CanvasWorkerManagerProps = ConstructorParameters<typeof CanvasWorkerManager>

export default class CanvasWorkerManager
  extends WorkerManager<Action<Message<File>>> {
  constructor(
    url: string,
    messageHandler: Worker["onmessage"],
    errorHandler: Worker["onerror"],
    canvasRef: HTMLCanvasElement,
    initActionName: string
  ) {
    super(url, messageHandler, errorHandler);
    this.transferControl(canvasRef, initActionName);
  }

  transferControl(
    canvasRef: HTMLCanvasElement,
    initAction: string
  ): void {
    const canvasControl = canvasRef.transferControlToOffscreen();
    this.worker.postMessage(
      createAction(initAction, {
        data: canvasControl,
      }),
      [canvasControl]
    );
  }
}
