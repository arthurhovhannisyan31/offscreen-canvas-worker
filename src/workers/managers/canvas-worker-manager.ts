// import { createAction } from "../common/actions";
import WorkerManager from "../managers/worker-manager";

type MessagesType = Action<Message<File>>;

export type CanvasWorkerManagerProps = ConstructorParameters<typeof CanvasWorkerManager>

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
    console.log(canvasRef);
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
