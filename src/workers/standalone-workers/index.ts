import { SECOND_INIT } from "../common";
import CanvasManager from "./managers/canvas-manager";
import SatelliteCanvasWorker from "./workers/satellite-offscreen-worker?worker" assert {type: "module"};

export const getMainWorker = (
  canvas: HTMLCanvasElement,
  satelliteCanvases: HTMLCanvasElement[],
):CanvasManager => {
  const manager = new CanvasManager(canvas);

  manager.addObserver(
    new SatelliteCanvasWorker(),
    satelliteCanvases[0],
    SECOND_INIT
  );

  return manager;
};

export default getMainWorker;
