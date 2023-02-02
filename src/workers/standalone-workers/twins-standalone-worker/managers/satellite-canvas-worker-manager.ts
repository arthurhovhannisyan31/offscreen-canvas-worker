import MainCanvasWorkerManager, { type CanvasWorkerManagerProps } from "./main-canvas-worker-manager";
import { SATELLITE_DRAW_REQUEST , createAction } from "../../../common";

interface WorkerUpdateMessage {
  data: ArrayBufferView
}

export default class SatelliteCanvasWorkerManager extends MainCanvasWorkerManager {
  constructor(...args: CanvasWorkerManagerProps) {
    super(...args);
  }

  update(data: WorkerUpdateMessage): void  {
    this.worker.postMessage(
      createAction(SATELLITE_DRAW_REQUEST, {
        data,
      }),
      [data.data.buffer]
    );
  }
}
