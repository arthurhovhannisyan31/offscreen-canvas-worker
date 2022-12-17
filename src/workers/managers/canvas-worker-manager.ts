// import { createAction } from "../common/actions";
import WorkerManager from "../managers/worker-manager";

export type CanvasWorkerManagerAction = Action<Message<File>>;

export type CanvasWorkerManagerProps = ConstructorParameters<typeof CanvasWorkerManager>

export default class CanvasWorkerManager
  extends WorkerManager<CanvasWorkerManagerAction> {
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
    // eslint-disable-next-line no-console
    console.log(canvasRef);
    // eslint-disable-next-line no-console
    console.log(initAction);
    // const canvasControl = canvasRef.transferControlToOffscreen();
    // this.worker.postMessage(
    //   createAction(initAction, {
    //     data: canvasControl,
    //   }),
    //   [canvasControl]
    // );
  }
}
