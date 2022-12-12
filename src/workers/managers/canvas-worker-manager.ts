import { createAction } from "../common/actions/createAction"
import WorkerManager from "../managers/worker-manager";

type MessagesType = Action<BoxedType<File>>;

export default class CanvasWorkerManager extends WorkerManager<MessagesType> {
  constructor(
    url: string,
    canvasRef: HTMLCanvasElement,
    messageHandler: Worker["onmessage"],
    errorHandler: Worker["onerror"],
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
