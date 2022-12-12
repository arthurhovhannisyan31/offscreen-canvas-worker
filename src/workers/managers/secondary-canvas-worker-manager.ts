import { SECOND_DRAW_REQUEST } from "../common/actions/actions";
import { createAction } from "../common/actions/createAction";
import CanvasWorkerManager from "./canvas-worker-manager";

interface WorkerMessagePayload {
  data: ArrayBufferView
}

export default class SecondaryCanvasWorkerManager extends CanvasWorkerManager {
  constructor(...args: ConstructorParameters<typeof CanvasWorkerManager>) {
    super(...args);
  }

  update(data: WorkerMessagePayload): void  {
    this.worker.postMessage(
      createAction(SECOND_DRAW_REQUEST, {
        data,
      }),
      [data.data.buffer]
    );
  }
}
