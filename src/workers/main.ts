import { SECOND_INIT } from "./common/actions";
import CanvasManager from "./managers/canvas-manager";
import SatelliteCanvasWorker from "./workers/satellite-offscreen-worker?worker" assert {type: "module"};

export const getMainWorker = (
  canvas: HTMLCanvasElement,
  satelliteCanvas: HTMLCanvasElement
):CanvasManager => {
  const manager = new CanvasManager(canvas);

  manager.addObserver(
    new SatelliteCanvasWorker(),
    satelliteCanvas,
    SECOND_INIT
  );

  return manager;
};

export default getMainWorker;
