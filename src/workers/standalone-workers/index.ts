import { SATELLITE_SET_CONTEXT } from "../common";
import CanvasManager from "./managers/canvas-manager";
import SatelliteCanvasWorker from "./workers/satellite-canvas-worker?worker" assert {type: "module"};

export const getMainWorker = (
  canvas: HTMLCanvasElement,
  satelliteCanvases: HTMLCanvasElement[],
):CanvasManager => {
  const manager = new CanvasManager(canvas);

  manager.addObserver(
    new SatelliteCanvasWorker(),
    satelliteCanvases[0],
    SATELLITE_SET_CONTEXT
  );

  return manager;
};

export default getMainWorker;
