import { SECOND_INIT } from "./common/actions";
import CanvasManager from "./managers/canvas-manager";
import satelliteCanvasWorker from "./workers/satellite-offscreen-worker?worker&url";

export const getMainWorker = (
  canvas: HTMLCanvasElement,
  satelliteCanvas: HTMLCanvasElement
):CanvasManager => {
  const manager = new CanvasManager(canvas);

  manager.addObserver(
    satelliteCanvasWorker,
    satelliteCanvas,
    SECOND_INIT
  );

  return manager;
};
