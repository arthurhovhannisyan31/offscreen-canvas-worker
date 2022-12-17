import { SECOND_DRAW_REQUEST , createAction } from "../common/actions";
import CanvasWorkerManager, { type CanvasWorkerManagerProps } from "./canvas-worker-manager";

interface WorkerUpdateMessage {
  data: ArrayBufferView
}

export default class SatelliteCanvasWorkerManager extends CanvasWorkerManager {
  constructor(...args: CanvasWorkerManagerProps) {
    super(...args);
  }

  update(data: WorkerUpdateMessage): void  {
    this.worker.postMessage(
      createAction(SECOND_DRAW_REQUEST, {
        data,
      }),
      [data.data.buffer]
    );
  }
}
